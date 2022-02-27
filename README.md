App.js calls to create Stack Navigator.
|- Stack Navigator contains "Home","BudgetScreen"

home.js uses FlatList to show the budgets name.
|-FlatList items are budgetItem from components

budgetScreen.js show calendar view (from components) of selected budget
|- Drawer Navigation is used- "yearView", "monthView"(Default), "dayView"

Test Cases: 
    1. Font Size dynamic based on height and width of screen.
    3. Sckeleton Animation on loading in all screens.
