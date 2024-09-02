<?php

namespace App\Services;

use App\Models\Post;
use App\Models\Process;
use App\Models\Category;
use App\Facades\DataTable;
use App\Http\Resources\PostResource;

class PostService
{
    public function index(): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        $query = Process::query();



        $filters = str_replace(
            $categories->pluck('slug')->map(fn($slug) => 'categories:' . $slug)->toArray(),
            $pluckReplace,
            request()->query('filters') ?? []
        );

        $query->join('users', 'users.id', '=', 'posts.user_id')
            ->select('posts.*', 'users.name as author');

        $result = DataTable::query($query)
            ->with(['user', 'categories'])
            ->searchable(['title', 'user.name', 'categories.name'])
            ->applyFilters($filters)
            ->allowedFilters(array_merge(
            ['status:published', 'status:draft', 'status:archived'],
                $pluckReplace
            ))
            ->allowedSorts(['title', 'created_at', 'author'])
            ->make();

        return PostResource::collection($result);
    }
}
