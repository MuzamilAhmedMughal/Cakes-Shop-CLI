import inquirer from "inquirer";
async function getOrder() {
    const order = await inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Enter Your Name"
        },
        {
            name: "pn",
            type: "input",
            message: "Enter Your Phone Number"
        },
        {
            name: "cakes",
            type: "checkbox",
            choices: ["Red Velvet", "Pineapple", "Black Forest", "Coffee", "Chocolate", "Cheese"],
            message: "Select Your Order!"
        },
    ]);
    const quantities = await getQuantities(order.cakes);
    const orderDetails = {
        id: orders.length + 1,
        name: order.name,
        phoneNumber: order.pn,
        cakes: order.cakes,
        quantities: quantities
    };
    console.log("Order complete!");
    console.log("Order Details:", orderDetails);
    return orderDetails;
}
async function getQuantities(cakes) {
    const quantities = [];
    for (const cake of cakes) {
        const { quantity } = await inquirer.prompt({
            name: "quantity",
            type: "number",
            message: `Enter Quantity of ${cake}`
        });
        quantities.push(quantity);
    }
    return quantities;
}
async function editOrder(order) {
    const { confirmEdit } = await inquirer.prompt({
        name: "confirmEdit",
        type: "confirm",
        message: "Do you want to edit this order?"
    });
    if (confirmEdit) {
        console.log(`Current Order: ${order.name} - ${order.phoneNumber}`);
        console.log(`Current Cakes: ${order.cakes.join(", ")}`);
        console.log(`Current Quantities: ${order.quantities.join(", ")}`);
        const { cakes } = await inquirer.prompt({
            name: "cakes",
            type: "checkbox",
            choices: ["Red Velvet", "Pineapple", "Black Forest", "Coffee", "Chocolate", "Cheese"],
            message: "Select new cakes for your order!"
        });
        const quantities = await getQuantities(cakes);
        const editedOrder = {
            ...order,
            cakes,
            quantities
        };
        const { confirm } = await inquirer.prompt({
            name: "confirm",
            type: "confirm",
            message: "Confirm changes to your order?"
        });
        if (confirm) {
            const index = orders.findIndex((o) => o.id === order.id);
            if (index !== -1) {
                orders[index] = editedOrder;
                console.log("Order updated!");
                console.log(`Updated Order: ${editedOrder.name} - ${editedOrder.phoneNumber}`);
                console.log(`Updated Cakes: ${editedOrder.cakes.join(", ")}`);
                console.log(`Updated Quantities: ${editedOrder.quantities.join(", ")}`);
            }
        }
    }
}
const orders = [];
async function main() {
    while (true) {
        const orderDetails = await getOrder();
        orders.push(orderDetails);
        const { edit } = await inquirer.prompt({
            name: "edit",
            type: "confirm",
            message: "Do you want to edit an existing order?"
        });
        if (edit) {
            const { orderId } = await inquirer.prompt({
                name: "orderId",
                type: "number",
                message: "Enter the order ID you want to edit"
            });
            const orderToEdit = orders.find((order) => order.id === orderId);
            if (orderToEdit) {
                console.log(`Order ID: ${orderToEdit.id}`);
                console.log(`Name: ${orderToEdit.name}`);
                console.log(`Phone Number: ${orderToEdit.phoneNumber}`);
                console.log(`Cakes: ${orderToEdit.cakes.join(", ")}`);
                console.log(`Quantities: ${orderToEdit.quantities.join(", ")}`);
                await editOrder(orderToEdit);
            }
            else {
                console.log("Order not found!");
            }
        }
    }
}
main();
