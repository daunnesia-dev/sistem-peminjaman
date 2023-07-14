"use client";;
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { getStatuses } from '@/helpers/dashboard/statuses/get-statuses';
import { cn } from '@/lib/utils';
import { CrossCircledIcon, ReloadIcon } from '@radix-ui/react-icons';
import { DataTable } from '../statuses/data-table';
import { columns } from './columns';

function Statuses() {
    const { data, isLoading, error } = getStatuses();

    return (
        <>
            {isLoading && (
                <div className="flex items-center justify-center w-full h-96">
                    <ReloadIcon className="w-8 h-8 animate-spin" />
                </div>
            )}
            {error && (
                <Alert
                    className={cn(
                        "bg-red-500 dark:bg-red-900 text-zinc-50 dark:text-zinc-50 border-red-500 dark:border-red-900"
                    )}
                    variant="destructive"
                >
                    <CrossCircledIcon color="#fafafa" className="w-4 h-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        Terjadi kesalahan saat memuat data.
                    </AlertDescription>
                </Alert>
            )}
            {data && !isLoading && !error && (
                <Card>
                    <CardContent className={cn("p-6")}>
                        <DataTable columns={columns} data={data} />
                    </CardContent>
                </Card>
            )}
        </>
    );
}

export default Statuses;