<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    public function index()
    {
        return Brand::all();
    }

    public function store(Request $request)
    {
        return Brand::create($request->all());
    }

    public function show($id)
    {
        return Brand::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $data = Brand::findOrFail($id);
        $data->update($request->all());
        return $data;
    }

    public function destroy($id)
    {
        Brand::destroy($id);
    }
}
