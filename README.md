App.js calls to create Stack Navigator.
    |- Stack Navigator contains "Home","BudgetScreen"

home.js uses FlatList to show the budgets name.
    |-FlatList items are budgetItem from components

budgetScreen.js show calendar view (from components) of selected budget
    |- Drawer Navigation is used- "yearView", "monthView"(Default), "dayView" 