<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class TodoController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Index', [
            'todos' => Todo::all()
        ]);
    }

    /**
     * @throws ValidationException
     */
    public function create(Request $request): RedirectResponse
    {
        $validator = Validator::make($request->all(), Todo::$createTodoRules);

        if ($validator->fails()) {
            return Redirect::back()->withErrors($validator)->withInput();
        }

        Todo::create($validator->validated());

        return to_route('index');
    }

    public function show(int $id): Response
    {
        return Inertia::render('Show', [
            'todo' => Todo::findOrFail($id)
        ]);
    }

    public function destroy(int $id): RedirectResponse
    {
        Todo::destroy($id);

        return to_route('index');
    }
}
