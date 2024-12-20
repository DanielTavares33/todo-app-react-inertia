<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
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

    public function create(Request $request): RedirectResponse
    {
        $data = $request->all();

        Todo::create(
            $request->validate([
                'todo' => ['required', 'max:50', 'min:3']
            ])
        );

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
