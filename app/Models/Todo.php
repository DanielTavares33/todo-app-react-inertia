<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    protected $fillable = [
        'todo',
    ];

    public static array $createTodoRules = [
        'todo' => ['required', 'max:50', 'min:3']
    ];
}
