# Todo

ensure that the sqlite database gets shared to the ui somehow - as a url ideally

add the sqlite-worker (see the example in /Users/ggp/dev/hs-git/northstar/table-example), loading the database

test querying it

then migrate the UI to use it.

---

Create Edit UI

Using the process documented in .agent/plans.md, come up with a full ui for editing data in this project.

The key objects are Recipe and Ingredient, and to a lesser degree, Units.

I want to be able to do all of the following:

Add a new Ingredient.

Add a new Recipe - with the option of creating a new ingredient easily from this workflow.

Edit an existing recipe.

All edits require a logged in user.
