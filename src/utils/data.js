export const data = {
    orders: [
        {
            id: 1,
            customer: "Z",
            items: [
                { id: 1, name: "Item 1", quantity: 5 },
                { id: 2, name: "Item 2", quantity: 3 }
            ],
            status: "Pending"
        },
        {
            id: 2,
            customer: "Customer B",
            items: [
                { id: 1, name: "Item 1", quantity: 2 },
                { id: 3, name: "Item 3", quantity: 1 }
            ],
            status: "Completed"
        },
        {
            id: 3,
            customer: "Test Customer",
            items: [
                { id: 1, name: "Test Item 1", quantity: 2 },
                { id: 3, name: "Test Item 2", quantity: 1 }
            ],
            status: "Pending"
        }
    ],
    items: [
        { id: 1, name: "Item 1", stock: 20 },
        { id: 2, name: "Item 2", stock: 15 },
        { id: 3, name: "Item 3", stock: 10 }
    ]
};
