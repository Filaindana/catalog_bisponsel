<?php

namespace App\Http\Controllers;

use App\Models\Promo;
use Illuminate\Http\Request;

class PromoController extends Controller
{
    public function index()
    {
        return Promo::all();
    }

    public function store(Request $request)
    {
        return Promo::create($request->all());
    }

    public function show($id)
    {
        return Promo::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $data = Promo::findOrFail($id);
        $data->update($request->all());
        return $data;
    }

    public function destroy($id)
    {
        Promo::destroy($id);
    }
}
