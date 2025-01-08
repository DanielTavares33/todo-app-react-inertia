<?php

use App\Http\Controllers\TodoController;
use Illuminate\Support\Facades\Route;

Route::get('/', [TodoController::class, 'index'])->name('index');
Route::post('/create', [TodoController::class, 'create'])->name('create');
Route::post('/destroy/{id}', [TodoController::class, 'destroy'])->name('destroy');
Route::put('/edit/{id}', [TodoController::class, 'update'])->name('update');
