<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        return Category::all();
    }

    public function store(Request $request)
    {
        return Category::create($request->all());
    }

    public function show($id)
    {
        return Category::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $data = Category::findOrFail($id);
        $data->update($request->all());
        return $data;
    }

    public function destroy($id)
    {
        Category::destroy($id);
        return response()->json(['message' => 'Deleted']);
    }
}
