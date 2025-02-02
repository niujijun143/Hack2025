'use client'
import React, { useEffect, useState } from 'react'
import { ScrollArea } from './ui/scroll-area'
import idata from '@/lib/data'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { authClient } from '@/lib/auth-client'

function Dash() {
    const [data, setData] = useState<{
        "Trip to China": {
            users: string[];
            expenses: {
                name: string;
                amount: number;
                currency: string;
                participants: string[];
            }[];
        };
        Japan: {
            users: string[];
            expenses: {
                name: string;
                amount: number;
                currency: string;
                participants: string[];
            }[];
        }
    }>({
        "Trip to China": {
            users: [],
            expenses: []
        },
        Japan: {
            users: [],
            expenses: []
        }

    });
    const [expenseName, setExpenseName] = useState('')
    const [amount, setAmount] = useState('')
    const [currency, setCurrency] = useState('')
    const [participants, setParticipants] = useState('')
    const { data: authData, isPending } = authClient.useSession()

    useEffect(() => {
        if (authData?.user.id == '679edd6fbaa4b6ef549cd00b') {
            setData(idata)
        }
    }, [authData?.user.id, isPending])

    const calculateShares = () => {
        const shares: { [key: string]: number } = {}

        data['Japan'].expenses.forEach(expense => {
            const amountPerPerson = expense.amount / expense.participants.length

            expense.participants.forEach(participant => {
                if (!shares[participant]) {
                    shares[participant] = 0
                }
                shares[participant] += amountPerPerson
            })
        })

        return shares
    }

    const handleAddExpense = () => {
        const newExpense = {
            name: expenseName,
            amount: parseFloat(amount),
            currency: currency,
            participants: participants.split(',').map(p => p.trim())
        }
        setData(prevData => {
            const updatedExpenses = [...prevData['Japan'].expenses, newExpense]
            return {
                ...prevData,
                'Japan': {
                    ...prevData['Japan'],
                    expenses: updatedExpenses
                }
            }
        })
        setExpenseName('')
        setAmount('')
        setCurrency('')
        setParticipants('')
    }

    return (
        <div className='grid lg:grid-cols-2 gap-4 p-4'>
            <Card className="">
                <CardHeader className='flex justify-between'>
                    <CardTitle className='text-xl font-medium pb-4'>Trip Expenses</CardTitle>
                </CardHeader>
                <CardContent>

                    <ScrollArea className="h-[625px]">
                        <div className='flex gap-2 flex-col'>
                            {data['Japan'].expenses.map((expense, ind) => (
                                <Card key={ind}>
                                    <CardHeader>
                                        <div className='flex justify-between'>
                                            <CardTitle>{expense.name}</CardTitle>
                                            <CardTitle>{expense.amount} {expense.currency}</CardTitle>
                                        </div>
                                        <div className="flex gap-2">
                                            {expense.participants.map((participant, ind) => (
                                                <Badge variant="secondary" key={ind}>{participant}</Badge>
                                            ))}
                                        </div>
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
            <section className='grid md:grid-flow-row md:grid-rows-2 gap-2'>
                <Card>
                    <CardHeader>
                        <CardTitle className='text-xl font-medium pb-4'>Add Expense</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='flex flex-col gap-2'>
                            <Input type='text' placeholder='Expense Name' value={expenseName} onChange={(e) => setExpenseName(e.target.value)} />
                            <Input type='number' placeholder='Amount' value={amount} onChange={(e) => setAmount(e.target.value)} />
                            <Input type='text' placeholder='Currency' value={currency} onChange={(e) => setCurrency(e.target.value)} />
                            <Input type='text' placeholder='Participants (comma separated)' value={participants} onChange={(e) => setParticipants(e.target.value)} />
                            <Button onClick={handleAddExpense}>Add Expense</Button>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className='text-xl font-medium pb-4'>Share Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='grid gap-3'>
                            {Object.entries(calculateShares()).map(([person, amount]) => (
                                <Card key={person}>
                                    <CardContent className="pt-6">
                                        <div className='flex justify-between items-center'>
                                            <div className='font-medium'>{person}</div>
                                            <div className='text-lg font-semibold'>
                                                {amount.toFixed(2)} {data['Japan'].expenses[0]?.currency}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </section>
        </div >
    )
}

export default Dash