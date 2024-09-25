import { Skeleton } from "@/components/ui/skeleton";


export const BreadcrumbsSkeleton = () => {
    return (
        <fieldset className="grid gap-6 rounded-lg border p-4 w-full m-2">
            <legend className="-ml-1 px-1 text-sm font-medium">
                <Skeleton className="h-5 w-24" />
            </legend>
            <div>
                <Skeleton className="h-8 mb-2" />
                <div className="flex space-x-2">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-16" />
                </div>
            </div>
        </fieldset>
    );
};