<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Service::query();

        // SEARCH
        if ($request->filled('search')) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('category', 'like', "%{$search}%");
            });
        }

        // FILTER CATEGORY
        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        // FILTER STATUS
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $services = $query
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return response()->json($services);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'required|in:Dental,Aesthetic',
            'price' => 'required|numeric|min:0',
            'status' => 'required|in:Active,Inactive',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        // HANDLE IMAGE
        if ($request->hasFile('image')) {
            $validated['image'] = $this->handleImageUpload(
                $request->file('image')
            );
        }

        $service = Service::create($validated);

        return response()->json([
            'message' => 'Service created successfully.',
            'data' => $service,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Service $service)
    {
        return response()->json($service);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Service $service)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'required|in:Dental,Aesthetic',
            'price' => 'required|numeric|min:0',
            'status' => 'required|in:Active,Inactive',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        // HANDLE IMAGE UPDATE
        if ($request->hasFile('image')) {

            // DELETE OLD IMAGE
            if (
                $service->image &&
                file_exists(public_path('images/services/' . $service->image))
            ) {
                unlink(public_path('images/services/' . $service->image));
            }

            $validated['image'] = $this->handleImageUpload(
                $request->file('image')
            );
        }

        $service->update($validated);

        return response()->json([
            'message' => 'Service updated successfully.',
            'data' => $service,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Service $service)
    {
        // DELETE IMAGE
        if (
            $service->image &&
            file_exists(public_path('images/services/' . $service->image))
        ) {
            unlink(public_path('images/services/' . $service->image));
        }

        $service->delete();

        return response()->json([
            'message' => 'Service deleted successfully.',
        ]);
    }

    /**
     * Handle image upload
     */
    private function handleImageUpload($file): string
    {
        // Generate unique filename
        $filename = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();

        // Ensure the directory exists
        $publicPath = public_path('images/services');

        if (!file_exists($publicPath)) {
            mkdir($publicPath, 0755, true);
        }

        // Move the uploaded file to public directory
        $file->move($publicPath, $filename);

        return $filename;
    }
}