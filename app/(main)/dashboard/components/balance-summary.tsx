import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

interface BalanceOwedItem {
    userId: string;
    name: string;
    imageUrl?: string;
    amount: number;
}

interface BalanceOwingItem {
    base: {
        userId: string;
        name: string;
        imageUrl?: string;
        amount: number;
    };
}

interface BalanceDetails {
    youAreOwedBy: BalanceOwedItem[];
    youOwe: BalanceOwingItem[];
}

interface BalanceSummaryProps {
    balances?: {
        oweDetails: BalanceDetails;
    };
}

export function BalanceSummary({ balances }: BalanceSummaryProps) {
    if (!balances) return null;

    const { oweDetails } = balances;
    const hasOwed = oweDetails.youAreOwedBy.length > 0;
    const hasOwing = oweDetails.youOwe.length > 0;

    return (
        <div className="space-y-4">
            {!hasOwed && !hasOwing && (
                <div className="text-center py-6">
                    <p className="text-muted-foreground">You&aposre all settled up!</p>
                </div>
            )}

            {hasOwed && (
                <div>
                    <h3 className="text-sm font-medium flex items-center mb-3">
                        <ArrowUpCircle className="h-4 w-4 text-green-500 mr-2" />
                        Owed to you
                    </h3>
                    <div className="space-y-3">
                        {oweDetails.youAreOwedBy.map((item, index) => (
                            <Link
                                href={`/person/${item.userId || ''}`}
                                key={item.userId || `owed-${index}`}
                                className="flex items-center justify-between hover:bg-muted p-2 rounded-md transition-colors"
                            >
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={item.imageUrl || undefined} />
                                        <AvatarFallback>
                                            {item.name?.charAt(0)?.toUpperCase() || '?'}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm">{item.name || 'Unknown'}</span>
                                </div>
                                <span className="font-medium text-green-600">
                                    ${(item.amount || 0).toFixed(2)}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {hasOwing && (
                <div>
                    <h3 className="text-sm font-medium flex items-center mb-3">
                        <ArrowDownCircle className="h-4 w-4 text-red-500 mr-2" />
                        You owe
                    </h3>
                    <div className="space-y-3">
                        {oweDetails.youOwe.map((item, index) => (
                            <Link
                                href={`/person/${item.base.userId || ''}`}
                                key={item.base.userId || `owing-${index}`}
                                className="flex items-center justify-between hover:bg-muted p-2 rounded-md transition-colors"
                            >
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={item.base.imageUrl || undefined} />
                                        <AvatarFallback>
                                            {item.base.name?.charAt(0)?.toUpperCase() || '?'}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm">{item.base.name || 'Unknown'}</span>
                                </div>
                                <span className="font-medium text-red-600">
                                    ${(item.base.amount || 0).toFixed(2)}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
