App.js calls to create Stack Navigator.
    |- Stack Navigator contains "Home","BudgetScreen"

home.js uses FlatList to show the budgets name.
    |-FlatList items are budgetItem from components

budgetScreen.js show calendar view (from components) of selected budget
    |- Drawer Navigation is used- "yearView", "monthView"(Default), "dayView" 


Test Cases:
    1. When Clicking the Daily view in drawer directly is not handled,
    2. Clicking Days name in calendar is not disabled,
    3. In calendar View, clicking empty day goes to previus month last date..
    