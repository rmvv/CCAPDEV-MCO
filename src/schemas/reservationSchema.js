const generateOptions = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, index) => (start + index).toString());
};
const generateTimeSlots = () => {
    let slots = [];
    for (let hour = 8; hour < 20; hour++) {
        slots.push(`${hour.toString().padStart(2, '0')}:00`, `${hour.toString().padStart(2, '0')}:30`);
    }
    return slots;
};

const reservationSchema = {
    title: "Reserve a Room",
    type: "object",
    required: ["username", "date", "room", "seat", "timeSlot"],
    properties: {
        _id: {
            type: "string",
            title: "ID",
            readOnly: true
        },
        username: {
            type: "string",
            title: "Username",
            readOnly: true
        },
        date: {
            type: "string",
            format: "date",
            title: "Reservation Date"
        },
        room: {
            type: "string",
            title: "Select Room",
            enum: generateOptions(1, 10)
        },
        seat: {
            type: "string",
            title: "Select Seat",
            enum: generateOptions(1, 30)
        },
        time: {
            type: "string",
            title: "Select Time Slot",
            enum: generateTimeSlots()
        },
        anonReservation: { 
            type: "boolean",
            title: "Anonymous Reservation",
            description: "Check this box if you want a anonymous reservation."
        }
    }
};

const reservationUISchema = {
    type: 'VerticalLayout',
    elements: [
        { type: 'Control', scope: '#/properties/username', label: 'Username' },
        { type: 'Control', scope: '#/properties/date', label: 'Reservation Date' },
        { type: 'Control', scope: '#/properties/room', label: 'Room' },
        { type: 'Control', scope: '#/properties/seat', label: 'Seat' },
        { type: 'Control', scope: '#/properties/time', label: 'Time Slot' },
        { type: 'Control', scope: '#/properties/anonReservation', label: 'Opt for Anonymous Reservation?' }
    ]
};

export { reservationSchema, reservationUISchema };