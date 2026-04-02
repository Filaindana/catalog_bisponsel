<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query();

        // 🔍 SEARCH
        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                    ->orWhereHas('category', function ($q2) use ($request) {
                        $q2->where('name', 'like', '%' . $request->search . '%');
                    });
            });
        }

        // 🏷️ CATEGORY FILTER
        if ($request->category) {
            $categories = (array) $request->category;
            $query->whereHas('category', function ($q) use ($categories) {
                $q->whereIn('name', $categories);
            });
        }

        // 🏷️ BRAND FILTER
        if ($request->brand) {
            $brands = (array) $request->brand;
            $query->whereHas('brand', function ($q) use ($brands) {
                $q->whereIn('name', $brands);
            });
        }

        // 💰 PRICE FILTER
        if ($request->max_price) {
            $query->where('price', '<=', $request->max_price);
        }

        // 💸 DISCOUNT FILTER
        if ($request->discount) {
            if ($request->discount == 'diskon') {
                $query->whereNotNull('discount');
            }
            if ($request->discount == 'best') {
                $query->where('rating', '>=', 4.7);
            }
            if ($request->discount == 'new') {
                $query->where('badge', 'New');
            }
        }

        // 🔄 SORTING
        switch ($request->sort) {
            case 'price_asc':
                $query->orderBy('price', 'asc');
                break;
            case 'price_desc':
                $query->orderBy('price', 'desc');
                break;
            case 'rating':
                $query->orderBy('rating', 'desc');
                break;
            default:
                $query->latest();
        }

        // 📄 PAGINATION
        $limit = $request->limit ?? 15;

        $products = $query->with(['category', 'brand'])->paginate($limit);

        return response()->json($products);
    }

    public function store(Request $request)
    {
        return Product::create($request->all());
    }

    public function show($id)
    {
        return Product::with(['category', 'brand'])->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $product->update($request->all());
        return $product;
    }

    public function destroy($id)
    {
        Product::destroy($id);
        return response()->json(['message' => 'Deleted']);
    }
}
