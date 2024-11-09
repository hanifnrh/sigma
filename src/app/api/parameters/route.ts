// app/api/parameters/route.ts

import { NextResponse } from "next/server";

const fetchParametersData = async () => {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/parameters/"); // Replace with your actual backend URL
        if (!response.ok) {
            throw new Error("Failed to fetch parameters data");
        }
        const data = await response.json();
        return data; // Assuming your backend returns the required parameters
    } catch (error) {
        console.error(error);
        return null;
    }
};

export async function GET() {
    const data = await fetchParametersData();
    if (data) {
        return NextResponse.json(data);
    } else {
        return NextResponse.json({ error: "Failed to fetch parameters data" }, { status: 500 });
    }
}
