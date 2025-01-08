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
            'todos' => Todo::orderBy('created_at', 'desc')->get(),
        ]);
    }

    /**
     * @throws ValidationException
     */
    public function create(Request $request): RedirectResponse
    {
        $validator = Validator::make($request->all(), Todo::$createTodoRules);

        if ($validator->fails()) {
            return Redirect::intended()->withErrors($validator)->withInput();
        }

        Todo::create($validator->validated());

        return to_route('index');
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        $validated = Validator::make($request->all(), Todo::$createTodoRules);

        if ($validated->fails()) {
            return Redirect::back()->withErrors($validated)->withInput();
        }

        $todo = Todo::findOrFail($id);
        $todo->update($validated->validated());

        return to_route('index')->with('success', 'Todo updated successfully.');
    }

    public function destroy(int $id): RedirectResponse
    {
        Todo::destroy($id);

        return to_route('index');
    }
}
