import React, { Suspense } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { BreadcrumbsSkeleton } from '@/components/skeletons/breadcrumbs-skeleton';


interface BreadcrumbItem {
  label: string;
  link?: string;
}

interface DynamicBreadcrumbsProps {
  items: BreadcrumbItem[];
}

const DynamicBreadcrumbs: React.FC<DynamicBreadcrumbsProps> = ({ items }) => {

  return (
    <Suspense fallback={<BreadcrumbsSkeleton />}>
      <fieldset className="grid gap-6 rounded-lg border p-4 w-full">
        <legend className="-ml-1 px-1 text-sm font-medium">
          Local
        </legend>
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              {items.map((item, index) => (
                <React.Fragment key={index}>
                  {index > 0 && index < items.length && <BreadcrumbSeparator />}
                  <BreadcrumbItem>
                    {item.link ? (
                      <BreadcrumbLink href={item.link}>
                        {item.label}
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </fieldset>
    </Suspense>
  );
};

export default DynamicBreadcrumbs;
