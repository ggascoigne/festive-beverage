import { useEffect, useMemo, useState, type FormEventHandler } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutlined'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined'
import EditNoteIcon from '@mui/icons-material/EditNote'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import LocalBarOutlinedIcon from '@mui/icons-material/LocalBarOutlined'
import Alert from '@mui/material/Alert'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import Fraction from 'fraction.js'
import { useRouter } from 'next/router'
import {
  Controller,
  useFieldArray,
  useForm,
  useWatch,
  type SubmitHandler,
  type UseFieldArrayReturn,
  type UseFormReturn,
} from 'react-hook-form'
import { z } from 'zod'

import { findIngredientMatches } from './ingredientMatches'

import { useAuth } from '@/components/Auth'
import { Loader } from '@/components/Loader'
import { useNotification } from '@/components/Notifications'
import { Page } from '@/components/Page'
import { api } from '@/utils/api'
import type { Drink, Ingredient, Unit } from '@/utils/apiTypes'

type EditorTab = 'recipe' | 'ingredient'

interface RecipeIngredientDraft {
  amount: string
  ingredientId?: number
  ingredientSearch: string
  modifier: string
  unitId?: number
}

interface RecipeDraft {
  description: string
  garnish: string
  glass: string
  id?: number
  instructions: string
  name: string
  recipeIngredients: RecipeIngredientDraft[]
  source: string
}

interface IngredientFormState {
  description: string
  name: string
  sort: string
  tags: string
}

const isValidFraction = (value: string) => {
  try {
    const parsed = new Fraction(value)
    return Number.isFinite(parsed.valueOf())
  } catch {
    return false
  }
}

const ingredientFormSchema = z.object({
  name: z.string().trim().min(1, 'Ingredient name is required.').max(128),
  tags: z.string().trim().max(128, 'Tags must be 128 characters or fewer.'),
  description: z.string().trim(),
  sort: z
    .string()
    .trim()
    .refine((value) => value.length === 0 || /^-?\d+$/.test(value), {
      message: 'Sort must be an integer.',
    }),
})

const recipeIngredientSchema = z
  .object({
    amount: z
      .string()
      .trim()
      .max(32, 'Amount must be 32 characters or fewer.')
      .refine((value) => value.length === 0 || isValidFraction(value), {
        message: 'Amount must be a number or fraction.',
      }),
    ingredientId: z.number().int().positive().optional(),
    ingredientSearch: z.string().trim(),
    modifier: z.string().trim().max(32, 'Modifier must be 32 characters or fewer.'),
    unitId: z.number().int().positive().optional(),
  })
  .superRefine((value, ctx) => {
    if (!value.ingredientId) {
      ctx.addIssue({
        code: 'custom',
        message: value.ingredientSearch
          ? 'Choose an ingredient or create the typed one first.'
          : 'Ingredient is required.',
        path: ['ingredientId'],
      })
    }
    if (!value.unitId) {
      ctx.addIssue({
        code: 'custom',
        message: 'Unit is required.',
        path: ['unitId'],
      })
    }
  })

const recipeFormSchema = z.object({
  id: z.number().int().positive().optional(),
  name: z.string().trim().min(1, 'Recipe name is required.').max(128),
  description: z.string().trim(),
  instructions: z.string().trim(),
  glass: z.string().trim().max(65, 'Glass must be 65 characters or fewer.'),
  garnish: z.string().trim().max(65, 'Garnish must be 65 characters or fewer.'),
  source: z.string().trim().max(128, 'Source must be 128 characters or fewer.'),
  recipeIngredients: z.array(recipeIngredientSchema).min(1, 'At least one recipe line is required.'),
})

const shrunkLabelSlotProps = {
  inputLabel: {
    shrink: true,
  },
} as const

const createBlankRecipeIngredient = (): RecipeIngredientDraft => ({
  amount: '',
  ingredientId: undefined,
  ingredientSearch: '',
  modifier: '',
  unitId: undefined,
})

const createBlankRecipeDraft = (): RecipeDraft => ({
  description: '',
  garnish: '',
  glass: '',
  instructions: '',
  name: '',
  recipeIngredients: [createBlankRecipeIngredient()],
  source: '',
})

const createBlankIngredientForm = (name = ''): IngredientFormState => ({
  description: '',
  name,
  sort: '',
  tags: '',
})

const toRecipeDraft = (recipe: Drink): RecipeDraft => ({
  id: recipe.id,
  name: recipe.name,
  description: recipe.description ?? '',
  instructions: recipe.instructions ?? '',
  glass: recipe.glass ?? '',
  garnish: recipe.garnish ?? '',
  source: recipe.source ?? '',
  recipeIngredients:
    recipe.recipeIngredients.length > 0
      ? recipe.recipeIngredients.map((ingredient) => ({
          amount: ingredient.amount ?? '',
          ingredientId: ingredient.ingredientId,
          ingredientSearch: ingredient.ingredient?.name ?? '',
          modifier: ingredient.modifier ?? '',
          unitId: ingredient.unitId,
        }))
      : [createBlankRecipeIngredient()],
})

const normalizeOptionalString = (value: string) => {
  const trimmed = value.trim()
  if (!trimmed) {
    return null
  }
  return trimmed
}

const normalizeOptionalInt = (value: string) => {
  const trimmed = value.trim()
  if (!trimmed) {
    return null
  }
  const parsed = Number.parseInt(trimmed, 10)
  return Number.isNaN(parsed) ? null : parsed
}

const recipeMatchesSearch = (recipe: Drink, search: string) => {
  const normalized = search.trim().toLocaleLowerCase()
  if (!normalized) {
    return true
  }

  return [recipe.name, recipe.source ?? '', recipe.ingredientText].some((value) =>
    value.toLocaleLowerCase().includes(normalized)
  )
}

const ingredientExists = (ingredients: readonly Ingredient[], name: string) => {
  const normalized = name.trim().toLocaleLowerCase()
  return normalized.length > 0 && ingredients.some((ingredient) => ingredient.name.toLocaleLowerCase() === normalized)
}

const IngredientFormFields: React.FC<{
  autoFocus?: boolean
  form: UseFormReturn<IngredientFormState>
}> = ({ autoFocus = false, form }) => {
  const {
    register,
    formState: { errors },
  } = form

  return (
    <Stack spacing={2}>
      <TextField
        label='Ingredient Name'
        {...register('name')}
        size='small'
        slotProps={shrunkLabelSlotProps}
        error={Boolean(errors.name)}
        helperText={errors.name?.message}
        required
        autoFocus={autoFocus}
      />
      <TextField
        label='Tags'
        {...register('tags')}
        size='small'
        slotProps={shrunkLabelSlotProps}
        error={Boolean(errors.tags)}
        helperText={errors.tags?.message ?? 'Optional search terms such as seasonal, citrus, or bitters.'}
      />
      <TextField
        label='Description'
        {...register('description')}
        size='small'
        slotProps={shrunkLabelSlotProps}
        error={Boolean(errors.description)}
        helperText={errors.description?.message}
        multiline
        minRows={2}
      />
      <TextField
        label='Sort'
        type='number'
        {...register('sort')}
        size='small'
        slotProps={shrunkLabelSlotProps}
        error={Boolean(errors.sort)}
        helperText={errors.sort?.message ?? 'Optional manual ordering value. Lower numbers sort earlier.'}
      />
    </Stack>
  )
}

const IngredientStudio: React.FC<{
  createPending: boolean
  form: UseFormReturn<IngredientFormState>
  ingredients: readonly Ingredient[]
  onSubmit: FormEventHandler<HTMLFormElement>
}> = ({ createPending, form, ingredients, onSubmit }) => {
  const ingredientName = useWatch({ control: form.control, name: 'name' }) ?? ''
  const normalizedIngredientName = ingredientName.trim().toLocaleLowerCase()
  const possibleMatches = useMemo(
    () => findIngredientMatches(ingredients, ingredientName),
    [ingredientName, ingredients]
  )
  const duplicateName = ingredientExists(ingredients, ingredientName)

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, xl: 7 }}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Box component='form' onSubmit={onSubmit}>
              <Stack spacing={2.5}>
                <Box>
                  <Typography variant='h5'>Ingredient Studio</Typography>
                  <Typography color='text.secondary'>
                    Add ingredients with search tags so recipe creation stays fast and searchable.
                  </Typography>
                </Box>
                {duplicateName ? <Alert severity='warning'>An ingredient with this name already exists.</Alert> : null}
                <IngredientFormFields form={form} autoFocus />
                <Box>
                  <Button variant='contained' type='submit' disabled={createPending || duplicateName}>
                    Save Ingredient
                  </Button>
                </Box>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, xl: 5 }}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Stack spacing={2}>
              <Box>
                <Typography variant='h5'>Possible Matches</Typography>
                <Typography color='text.secondary'>
                  {normalizedIngredientName
                    ? possibleMatches.total > 0
                      ? `Showing ${possibleMatches.matches.length} of ${possibleMatches.total} matching ingredients.`
                      : 'No existing ingredients match this name or its tags.'
                    : 'Start typing an ingredient name to check the full library for duplicates.'}
                </Typography>
              </Box>
              {possibleMatches.matches.length > 0 ? (
                <Stack direction='row' spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
                  {possibleMatches.matches.map((ingredient) => {
                    const exactMatch = ingredient.name.toLocaleLowerCase() === normalizedIngredientName
                    return (
                      <Chip
                        key={ingredient.id}
                        label={ingredient.tags ? `${ingredient.name} • ${ingredient.tags}` : ingredient.name}
                        variant={exactMatch ? 'filled' : 'outlined'}
                        color={exactMatch ? 'warning' : 'default'}
                        onClick={() =>
                          form.setValue('name', ingredient.name, {
                            shouldDirty: true,
                            shouldTouch: true,
                            shouldValidate: true,
                          })
                        }
                      />
                    )
                  })}
                </Stack>
              ) : null}
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

const RecipeWorkspace: React.FC<{
  activeRecipe?: Drink
  compact: boolean
  createIngredientFromRow: (rowIndex: number) => void
  fieldArray: UseFieldArrayReturn<RecipeDraft, 'recipeIngredients'>
  form: UseFormReturn<RecipeDraft>
  ingredients: readonly Ingredient[]
  onSave: FormEventHandler<HTMLFormElement>
  savePending: boolean
  units: readonly Unit[]
}> = ({
  activeRecipe,
  compact,
  createIngredientFromRow,
  fieldArray,
  form,
  ingredients,
  onSave,
  savePending,
  units,
}) => {
  const [deleteIngredientIndex, setDeleteIngredientIndex] = useState<number | null>(null)
  const recipeIngredients = useWatch({
    control: form.control,
    name: 'recipeIngredients',
  }) ?? [createBlankRecipeIngredient()]
  const recipeId = form.watch('id')
  const {
    formState: { errors },
    register,
    setValue,
    control,
  } = form

  const ingredientPreview = recipeIngredients
    .map((ingredient) => ingredients.find((item) => item.id === ingredient?.ingredientId))
    .filter((ingredient): ingredient is Ingredient => Boolean(ingredient))
    .map((ingredient) => ingredient.name)
  const deleteIngredientName =
    deleteIngredientIndex === null ? '' : (recipeIngredients[deleteIngredientIndex]?.ingredientSearch.trim() ?? '')

  const confirmDeleteIngredient = () => {
    if (deleteIngredientIndex !== null) {
      fieldArray.remove(deleteIngredientIndex)
    }
    setDeleteIngredientIndex(null)
  }

  return (
    <Box component='form' onSubmit={onSave}>
      <Stack spacing={3}>
        {compact ? null : (
          <Card
            sx={{
              background:
                'linear-gradient(135deg, rgba(63,81,181,0.12) 0%, rgba(255,255,255,1) 58%, rgba(0,188,212,0.08) 100%)',
            }}
          >
            <CardContent>
              <Stack spacing={1.5}>
                <Typography variant='overline' color='primary.main'>
                  Recipe Workspace
                </Typography>
                <Typography variant='h4'>
                  {activeRecipe ? `Editing ${activeRecipe.name}` : 'Create a new recipe'}
                </Typography>
                <Stack direction='row' spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
                  {ingredientPreview.length > 0 ? (
                    ingredientPreview.map((ingredient) => <Chip key={ingredient} label={ingredient} size='small' />)
                  ) : (
                    <Chip label='No ingredients selected yet' variant='outlined' size='small' />
                  )}
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label='Recipe Name'
                  {...register('name')}
                  size='small'
                  slotProps={shrunkLabelSlotProps}
                  error={Boolean(errors.name)}
                  helperText={errors.name?.message}
                  fullWidth
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label='Source'
                  {...register('source')}
                  size='small'
                  slotProps={shrunkLabelSlotProps}
                  error={Boolean(errors.source)}
                  helperText={errors.source?.message}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label='Glass'
                  {...register('glass')}
                  size='small'
                  slotProps={shrunkLabelSlotProps}
                  error={Boolean(errors.glass)}
                  helperText={errors.glass?.message}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label='Garnish'
                  {...register('garnish')}
                  size='small'
                  slotProps={shrunkLabelSlotProps}
                  error={Boolean(errors.garnish)}
                  helperText={errors.garnish?.message}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  label='Description'
                  {...register('description')}
                  size='small'
                  slotProps={shrunkLabelSlotProps}
                  error={Boolean(errors.description)}
                  helperText={errors.description?.message}
                  multiline
                  minRows={2}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  label='Instructions'
                  {...register('instructions')}
                  size='small'
                  slotProps={shrunkLabelSlotProps}
                  error={Boolean(errors.instructions)}
                  helperText={errors.instructions?.message}
                  multiline
                  minRows={2}
                  fullWidth
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Stack spacing={2.5}>
              <Typography variant='h5'>Ingredients</Typography>

              {typeof errors.recipeIngredients?.message === 'string' ? (
                <Alert severity='error'>{errors.recipeIngredients.message}</Alert>
              ) : null}

              <Stack spacing={2}>
                {fieldArray.fields.map((field, index) => {
                  const ingredient = recipeIngredients[index] ?? createBlankRecipeIngredient()
                  const canCreateFromSearch =
                    ingredient.ingredientSearch.trim().length > 0 &&
                    !ingredientExists(ingredients, ingredient.ingredientSearch.trim())

                  return (
                    <Box key={field.id}>
                      <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 5 }}>
                          <input type='hidden' {...register(`recipeIngredients.${index}.ingredientSearch` as const)} />
                          <Controller
                            control={control}
                            name={`recipeIngredients.${index}.ingredientId` as const}
                            render={({ field: controllerField }) => {
                              const selectedIngredient =
                                ingredients.find((item) => item.id === controllerField.value) ?? null

                              return (
                                <Autocomplete
                                  size='small'
                                  options={ingredients}
                                  value={selectedIngredient}
                                  inputValue={ingredient.ingredientSearch}
                                  onInputChange={(_event, value, reason) => {
                                    if (reason === 'input' || reason === 'clear') {
                                      setValue(`recipeIngredients.${index}.ingredientSearch`, value, {
                                        shouldDirty: true,
                                        shouldTouch: true,
                                        shouldValidate: true,
                                      })
                                      if (selectedIngredient?.name !== value) {
                                        controllerField.onChange(undefined)
                                      }
                                    }
                                  }}
                                  onChange={(_event, value) => {
                                    controllerField.onChange(value?.id)
                                    setValue(`recipeIngredients.${index}.ingredientSearch`, value?.name ?? '', {
                                      shouldDirty: true,
                                      shouldTouch: true,
                                      shouldValidate: true,
                                    })
                                  }}
                                  getOptionLabel={(option) => option.name}
                                  isOptionEqualToValue={(option, value) => option.id === value.id}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label='Ingredient'
                                      size='small'
                                      slotProps={{
                                        ...params.slotProps,
                                        inputLabel: shrunkLabelSlotProps.inputLabel,
                                      }}
                                      error={Boolean(errors.recipeIngredients?.[index]?.ingredientId)}
                                      helperText={
                                        errors.recipeIngredients?.[index]?.ingredientId?.message ??
                                        (canCreateFromSearch ? 'Use the button to add this ingredient now.' : undefined)
                                      }
                                    />
                                  )}
                                />
                              )
                            }}
                          />
                        </Grid>
                        <Grid size={{ xs: 3, sm: 12, md: 2 }}>
                          <TextField
                            label='Amount'
                            {...register(`recipeIngredients.${index}.amount` as const)}
                            size='small'
                            slotProps={shrunkLabelSlotProps}
                            error={Boolean(errors.recipeIngredients?.[index]?.amount)}
                            helperText={errors.recipeIngredients?.[index]?.amount?.message}
                            fullWidth
                          />
                        </Grid>
                        <Grid size={{ xs: 3, sm: 12, md: 2 }}>
                          <Controller
                            control={control}
                            name={`recipeIngredients.${index}.unitId` as const}
                            render={({ field: controllerField }) => (
                              <TextField
                                label='Unit'
                                select
                                size='small'
                                slotProps={{ ...shrunkLabelSlotProps, select: { native: true } }}
                                value={controllerField.value ?? ''}
                                onChange={(event) =>
                                  controllerField.onChange(
                                    event.target.value ? Number.parseInt(event.target.value, 10) : undefined
                                  )
                                }
                                error={Boolean(errors.recipeIngredients?.[index]?.unitId)}
                                helperText={errors.recipeIngredients?.[index]?.unitId?.message}
                                fullWidth
                              >
                                <option value=''>Select a unit</option>
                                {units.map((unit) => (
                                  <option key={unit.id} value={unit.id}>
                                    {unit.name}
                                  </option>
                                ))}
                              </TextField>
                            )}
                          />
                        </Grid>
                        <Grid size={{ xs: 4, sm: 12, md: 2 }}>
                          <TextField
                            label='Modifier'
                            {...register(`recipeIngredients.${index}.modifier` as const)}
                            size='small'
                            slotProps={shrunkLabelSlotProps}
                            error={Boolean(errors.recipeIngredients?.[index]?.modifier)}
                            helperText={errors.recipeIngredients?.[index]?.modifier?.message}
                            fullWidth
                          />
                        </Grid>
                        <Grid size={{ xs: 2, sm: 12, md: 1 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                            <IconButton
                              color='inherit'
                              onClick={() => setDeleteIngredientIndex(index)}
                              disabled={fieldArray.fields.length === 1}
                              aria-label='Delete recipe line'
                            >
                              <DeleteOutlineIcon />
                            </IconButton>
                          </Box>
                        </Grid>
                        {canCreateFromSearch ? (
                          <Grid size={{ xs: 12 }}>
                            <Button size='small' onClick={() => createIngredientFromRow(index)}>
                              Create &quot;{ingredient.ingredientSearch.trim()}&quot;
                            </Button>
                          </Grid>
                        ) : null}
                      </Grid>
                    </Box>
                  )
                })}
              </Stack>

              <Button
                startIcon={<AddCircleOutlineIcon />}
                onClick={() => fieldArray.append(createBlankRecipeIngredient())}
                fullWidth={compact}
                sx={{ alignSelf: compact ? 'stretch' : 'flex-start' }}
              >
                Add Ingredient
              </Button>

              <Divider />

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 2,
                  flexWrap: 'wrap',
                }}
              >
                <Typography color='text.secondary'>
                  Search text is generated automatically from the selected ingredient names and tags.
                </Typography>
                <Button variant='contained' startIcon={<EditNoteIcon />} type='submit' disabled={savePending}>
                  {recipeId ? 'Save Recipe Changes' : 'Create Recipe'}
                </Button>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      <Dialog open={deleteIngredientIndex !== null} onClose={() => setDeleteIngredientIndex(null)}>
        <DialogTitle>Remove ingredient?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {deleteIngredientName
              ? `Remove "${deleteIngredientName}" from this recipe draft?`
              : 'Remove this ingredient line from the recipe draft?'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteIngredientIndex(null)}>Cancel</Button>
          <Button color='error' onClick={confirmDeleteIngredient}>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export const EditView = () => {
  const router = useRouter()
  const theme = useTheme()
  const isPhoneLayout = useMediaQuery(theme.breakpoints.down('sm'))
  const utils = api.useUtils()
  const notify = useNotification()
  const { isLoading: authLoading, user } = useAuth()
  const [activeTab, setActiveTab] = useState<EditorTab>('recipe')
  const [recipeSearch, setRecipeSearch] = useState('')
  const [mobileRecipeEditorOpen, setMobileRecipeEditorOpen] = useState(false)
  const [ingredientDialogRowIndex, setIngredientDialogRowIndex] = useState<number | null>(null)
  const [ingredientDialogOpen, setIngredientDialogOpen] = useState(false)

  const recipeForm = useForm<RecipeDraft>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: createBlankRecipeDraft(),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })
  const ingredientStudioForm = useForm<IngredientFormState>({
    resolver: zodResolver(ingredientFormSchema),
    defaultValues: createBlankIngredientForm(),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })
  const ingredientDialogForm = useForm<IngredientFormState>({
    resolver: zodResolver(ingredientFormSchema),
    defaultValues: createBlankIngredientForm(),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })
  const recipeFieldArray = useFieldArray({
    control: recipeForm.control,
    name: 'recipeIngredients',
  })

  const { data: recipes, error: recipeError } = api.drinks.getAllDrinks.useQuery(undefined, {
    staleTime: 60 * 60 * 1000,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
  const { data: ingredients, error: ingredientError } = api.drinks.getAllIngredients.useQuery(undefined, {
    staleTime: 60 * 60 * 1000,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
  const { data: units, error: unitError } = api.drinks.getAllUnits.useQuery(undefined, {
    staleTime: 60 * 60 * 1000,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })

  const selectedRecipeId = useMemo(() => {
    const raw = router.query.recipeId
    if (!raw || typeof raw !== 'string') {
      return undefined
    }
    const parsed = Number.parseInt(raw, 10)
    return Number.isNaN(parsed) ? undefined : parsed
  }, [router.query.recipeId])

  const activeRecipe = useMemo(
    () => recipes?.find((recipe) => recipe.id === selectedRecipeId),
    [recipes, selectedRecipeId]
  )

  const filteredRecipes = useMemo(
    () => recipes?.filter((recipe) => recipeMatchesSearch(recipe, recipeSearch)) ?? [],
    [recipeSearch, recipes]
  )

  const currentRecipeId = recipeForm.watch('id')

  useEffect(() => {
    if (activeRecipe) {
      recipeForm.reset(toRecipeDraft(activeRecipe))
      setActiveTab('recipe')
      return
    }
    if (!selectedRecipeId) {
      recipeForm.reset(createBlankRecipeDraft())
    }
  }, [activeRecipe, recipeForm, selectedRecipeId])

  useEffect(() => {
    if (isPhoneLayout && selectedRecipeId) {
      setMobileRecipeEditorOpen(true)
    }
  }, [isPhoneLayout, selectedRecipeId])

  const updateRecipeRoute = (recipeId?: number) => {
    router
      .replace(
        {
          pathname: '/edit',
          query: recipeId ? { recipeId } : {},
        },
        undefined,
        { shallow: true }
      )
      .catch(() => undefined)
  }

  const closeIngredientDialog = () => {
    setIngredientDialogOpen(false)
    setIngredientDialogRowIndex(null)
    ingredientDialogForm.reset(createBlankIngredientForm())
  }

  const createIngredientMutation = api.drinks.createIngredient.useMutation({
    onSuccess: async (ingredient) => {
      const createdFromRecipeRow = ingredientDialogRowIndex !== null

      await utils.drinks.getAllIngredients.invalidate()
      notify({
        text: `Saved ingredient "${ingredient.name}".`,
        variant: 'success',
      })

      if (createdFromRecipeRow && ingredientDialogRowIndex !== null) {
        recipeForm.setValue(`recipeIngredients.${ingredientDialogRowIndex}.ingredientId`, ingredient.id, {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true,
        })
        recipeForm.setValue(`recipeIngredients.${ingredientDialogRowIndex}.ingredientSearch`, ingredient.name, {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true,
        })
        setActiveTab('recipe')
      } else {
        ingredientStudioForm.reset(createBlankIngredientForm())
      }

      closeIngredientDialog()
    },
    onError: (error) => {
      notify({
        text: error.message,
        variant: 'error',
      })
    },
  })

  const createRecipeMutation = api.drinks.createRecipe.useMutation({
    onSuccess: async (recipe) => {
      updateRecipeRoute(recipe.id)
      await utils.drinks.getAllDrinks.invalidate()
      recipeForm.reset(toRecipeDraft(recipe))
      notify({
        text: `Created recipe "${recipe.name}".`,
        variant: 'success',
      })
    },
    onError: (error) => {
      notify({
        text: error.message,
        variant: 'error',
      })
    },
  })

  const updateRecipeMutation = api.drinks.updateRecipe.useMutation({
    onSuccess: async (recipe) => {
      await utils.drinks.getAllDrinks.invalidate()
      recipeForm.reset(toRecipeDraft(recipe))
      notify({
        text: `Saved changes to "${recipe.name}".`,
        variant: 'success',
      })
    },
    onError: (error) => {
      notify({
        text: error.message,
        variant: 'error',
      })
    },
  })

  if (recipeError ?? ingredientError ?? unitError) {
    return (
      <Page title='Edit Festive Beverages'>
        <Alert severity='error'>
          {(recipeError ?? ingredientError ?? unitError)?.message ?? 'Unable to load editor data.'}
        </Alert>
      </Page>
    )
  }

  if (authLoading || !recipes || !ingredients || !units) {
    return (
      <Page title='Edit Festive Beverages'>
        <Loader />
      </Page>
    )
  }

  if (!user) {
    return (
      <Page title='Edit Festive Beverages'>
        <Card
          sx={{
            maxWidth: 720,
            margin: '40px auto',
            background:
              'linear-gradient(135deg, rgba(63,81,181,0.12) 0%, rgba(255,255,255,1) 55%, rgba(76,175,80,0.08) 100%)',
          }}
        >
          <CardContent>
            <Stack spacing={2.5}>
              <Typography variant='h4'>Sign in to edit recipes and ingredients</Typography>
              <Typography color='text.secondary'>
                Browsing remains public, but all add and edit actions require an authenticated user session.
              </Typography>
              <Box>
                <Button variant='contained' href='/api/auth/login'>
                  Log In
                </Button>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Page>
    )
  }

  const savePending =
    createRecipeMutation.isPending || updateRecipeMutation.isPending || recipeForm.formState.isSubmitting

  const submitRecipe: SubmitHandler<RecipeDraft> = async (values) => {
    const payload = {
      name: values.name.trim(),
      description: normalizeOptionalString(values.description),
      instructions: normalizeOptionalString(values.instructions),
      glass: normalizeOptionalString(values.glass),
      garnish: normalizeOptionalString(values.garnish),
      source: normalizeOptionalString(values.source),
      recipeIngredients: values.recipeIngredients.map((ingredient) => ({
        ingredientId: ingredient.ingredientId!,
        unitId: ingredient.unitId!,
        amount: normalizeOptionalString(ingredient.amount),
        modifier: normalizeOptionalString(ingredient.modifier),
      })),
    }

    if (values.id) {
      await updateRecipeMutation.mutateAsync({
        id: values.id,
        ...payload,
      })
      return
    }

    await createRecipeMutation.mutateAsync(payload)
  }

  const handleRecipeSubmit = recipeForm.handleSubmit(submitRecipe, () => {
    notify({
      text: 'Fix the highlighted recipe fields before saving.',
      variant: 'warning',
    })
  })

  const submitIngredient = async (values: IngredientFormState) => {
    await createIngredientMutation.mutateAsync({
      name: values.name.trim(),
      tags: normalizeOptionalString(values.tags),
      description: normalizeOptionalString(values.description),
      sort: normalizeOptionalInt(values.sort),
    })
  }

  const handleIngredientStudioSubmit = ingredientStudioForm.handleSubmit(submitIngredient, () => {
    notify({
      text: 'Fix the highlighted ingredient fields before saving.',
      variant: 'warning',
    })
  })

  const handleIngredientDialogSubmit = ingredientDialogForm.handleSubmit(submitIngredient, () => {
    notify({
      text: 'Fix the highlighted ingredient fields before saving.',
      variant: 'warning',
    })
  })

  const openIngredientDialog = (rowIndex: number) => {
    const currentName = recipeForm.getValues(`recipeIngredients.${rowIndex}.ingredientSearch`).trim()
    ingredientDialogForm.reset(createBlankIngredientForm(currentName))
    setIngredientDialogRowIndex(rowIndex)
    setIngredientDialogOpen(true)
  }

  const showMobileRecipeEditor = () => {
    if (isPhoneLayout) {
      setMobileRecipeEditorOpen(true)
      window.scrollTo({ top: 0 })
    }
  }

  const startNewRecipe = () => {
    updateRecipeRoute()
    recipeForm.reset(createBlankRecipeDraft())
    setActiveTab('recipe')
    showMobileRecipeEditor()
  }

  const selectRecipe = (recipeId: number) => {
    updateRecipeRoute(recipeId)
    setActiveTab('recipe')
    showMobileRecipeEditor()
  }

  const showMobileRecipeLibrary = () => {
    setMobileRecipeEditorOpen(false)
    window.scrollTo({ top: 0 })
  }

  return (
    <Page
      title='Edit Festive Beverages'
      sx={{
        background:
          'linear-gradient(180deg, rgba(250,250,250,1) 0%, rgba(255,255,255,1) 20%, rgba(250,250,250,1) 100%)',
      }}
    >
      <Stack spacing={3}>
        <Grid container spacing={3}>
          {!isPhoneLayout || !mobileRecipeEditorOpen ? (
            <Grid size={{ xs: 12, md: 4, lg: 3 }}>
              {isPhoneLayout ? (
                <Button
                  variant='contained'
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={startNewRecipe}
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  New Recipe
                </Button>
              ) : null}

              <Card sx={{ mb: 3, display: isPhoneLayout ? 'none' : undefined }}>
                <CardContent>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant='overline' color='primary.main'>
                        Editor
                      </Typography>
                      <Typography variant='h5'>Catalog control room</Typography>
                      <Typography color='text.secondary'>
                        Switch between adding fresh data and refining recipes already on the site.
                      </Typography>
                    </Box>
                    <Grid container spacing={1.5}>
                      <Grid size={{ xs: 6 }}>
                        <Card variant='outlined'>
                          <CardContent>
                            <Stack spacing={0.5}>
                              <LocalBarOutlinedIcon color='primary' />
                              <Typography variant='h5'>{recipes.length}</Typography>
                              <Typography color='text.secondary'>Recipes</Typography>
                            </Stack>
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid size={{ xs: 6 }}>
                        <Card variant='outlined'>
                          <CardContent>
                            <Stack spacing={0.5}>
                              <Inventory2OutlinedIcon color='primary' />
                              <Typography variant='h5'>{ingredients.length}</Typography>
                              <Typography color='text.secondary'>Ingredients</Typography>
                            </Stack>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                    <Button variant='contained' startIcon={<AddCircleOutlineIcon />} onClick={startNewRecipe}>
                      New Recipe
                    </Button>
                  </Stack>
                </CardContent>
              </Card>

              <Card
                sx={{
                  mb: isPhoneLayout ? 0 : 3,
                  height: isPhoneLayout ? 'calc(100dvh - 190px)' : undefined,
                }}
              >
                <CardContent sx={{ height: '100%', boxSizing: 'border-box' }}>
                  <Stack spacing={2} sx={{ height: '100%' }}>
                    <Typography variant='h5'>Recipe Library</Typography>
                    <TextField
                      label='Search recipes'
                      value={recipeSearch}
                      onChange={(event) => setRecipeSearch(event.target.value)}
                      size='small'
                      slotProps={shrunkLabelSlotProps}
                      fullWidth
                    />
                    <List
                      aria-label='Recipe library'
                      sx={{
                        maxHeight: isPhoneLayout ? undefined : 420,
                        flex: isPhoneLayout ? 1 : undefined,
                        minHeight: 0,
                        overflowY: 'auto',
                        p: 0,
                      }}
                    >
                      {filteredRecipes.map((recipe) => (
                        <ListItemButton
                          key={recipe.id}
                          selected={recipe.id === currentRecipeId}
                          onClick={() => selectRecipe(recipe.id)}
                          sx={{ borderRadius: 1, mb: 0.5 }}
                        >
                          <ListItemText
                            primary={recipe.name}
                            secondary={isPhoneLayout ? undefined : (recipe.description ?? undefined)}
                            slotProps={{
                              secondary: {
                                sx: {
                                  display: '-webkit-box',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  WebkitBoxOrient: 'vertical',
                                  WebkitLineClamp: 2,
                                },
                              },
                            }}
                          />
                        </ListItemButton>
                      ))}
                      {filteredRecipes.length === 0 ? (
                        <Alert severity='info'>No recipes match the current search.</Alert>
                      ) : null}
                    </List>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ) : null}

          {!isPhoneLayout || mobileRecipeEditorOpen ? (
            <Grid size={{ xs: 12, md: 8, lg: 9 }}>
              {isPhoneLayout ? (
                <Button startIcon={<ArrowBackIcon />} onClick={showMobileRecipeLibrary} sx={{ mb: 2 }}>
                  Back to Recipe Library
                </Button>
              ) : null}
              <Card sx={{ mb: 3 }}>
                <CardContent sx={{ pb: '16px !important' }}>
                  <Tabs value={activeTab} onChange={(_event, value: EditorTab) => setActiveTab(value)}>
                    <Tab value='recipe' label='Recipe Editor' />
                    <Tab value='ingredient' label='Ingredient Studio' />
                  </Tabs>
                </CardContent>
              </Card>

              {activeTab === 'recipe' ? (
                <RecipeWorkspace
                  activeRecipe={activeRecipe}
                  compact={isPhoneLayout}
                  createIngredientFromRow={openIngredientDialog}
                  fieldArray={recipeFieldArray}
                  form={recipeForm}
                  ingredients={ingredients}
                  onSave={handleRecipeSubmit}
                  savePending={savePending}
                  units={units}
                />
              ) : (
                <IngredientStudio
                  createPending={createIngredientMutation.isPending || ingredientStudioForm.formState.isSubmitting}
                  form={ingredientStudioForm}
                  ingredients={ingredients}
                  onSubmit={handleIngredientStudioSubmit}
                />
              )}
            </Grid>
          ) : null}
        </Grid>
      </Stack>

      <Dialog open={ingredientDialogOpen} onClose={closeIngredientDialog} fullWidth maxWidth='sm'>
        <DialogTitle>Create Ingredient</DialogTitle>
        <DialogContent>
          <Box component='form' id='ingredient-dialog-form' onSubmit={handleIngredientDialogSubmit} sx={{ pt: 1 }}>
            <IngredientFormFields form={ingredientDialogForm} autoFocus />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeIngredientDialog}>Cancel</Button>
          <Button
            variant='contained'
            type='submit'
            form='ingredient-dialog-form'
            disabled={createIngredientMutation.isPending || ingredientDialogForm.formState.isSubmitting}
          >
            Save Ingredient
          </Button>
        </DialogActions>
      </Dialog>
    </Page>
  )
}
