<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Get all users with optional filtering
     */
    public function index(Request $request)
    {
        $query = User::query();

        // Filter by status (default to active)
        $status = $request->get('status', 'active');
        $query->where('status', $status);

        // Filter by role
        if ($request->has('role')) {
            $query->where('role', $request->role);
        }

        // Search by name or email
        if ($request->filled('search')) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $perPage = $request->get('per_page', 50);

        $users = $query->orderBy('created_at', 'desc')->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $users->items(),
            'meta' => [
                'current_page' => $users->currentPage(),
                'last_page' => $users->lastPage(),
                'per_page' => $users->perPage(),
                'total' => $users->total(),
            ],
        ]);
    }

    public function update(Request $request, $id)
    {
        $authUser = Auth::user();
        $user = User::findOrFail($id);

        // Admin can update role/status/basic info
        if ($authUser->role === 'admin') {
            $validated = $request->validate([
                'role' => 'sometimes|in:customer,admin',
                'status' => 'sometimes|in:active,deactivated',
                'name' => 'sometimes|string|max:255',
                'email' => 'sometimes|email|unique:users,email,' . $id,
            ]);

            $user->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'User updated successfully (admin).',
                'data' => $user,
            ]);
        }

        // Non-admin can only update own phone
        if ($authUser->id !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized.',
            ], 403);
        }

        $validated = $request->validate([
            'phone' => 'required|string|max:20',
        ]);

        $user->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Phone updated successfully.',
            'data' => $user,
        ]);
    }

    /**
     * Get a single user by ID
     */
    public function show($id)
    {
        $user = User::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $user,
        ]);
    }

    /**
     * Delete a user
     */
    public function destroy($id)
    {
        $authUser = Auth::user();

        if ($authUser->role !== 'admin') {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized.',
            ], 403);
        }

        $user = User::findOrFail($id);
        $user->delete();

        return response()->json([
            'success' => true,
            'message' => 'User deleted successfully',
        ]);
    }
}
