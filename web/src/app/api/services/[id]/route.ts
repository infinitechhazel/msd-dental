import { NextRequest, NextResponse } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL

// GET ONE
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        const res = await fetch(
            `${API_URL}/api/admin/services/${id}`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    Authorization: req.headers.get("authorization") || "",
                },
                cache: "no-store",
            }
        )

        const data = await res.json()

        return NextResponse.json(data, { status: res.status })
    } catch (err) {
        return NextResponse.json(
            { message: "GET service failed", err },
            { status: 500 }
        )
    }
}

// UPDATE
export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const formData = await req.formData()

        formData.append("_method", "PUT")

        const res = await fetch(
            `${API_URL}/api/admin/services/${id}`,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    Authorization: req.headers.get("authorization") || "",
                },
                body: formData,
            }
        )

        const data = await res.json()

        return NextResponse.json(data, { status: res.status })
    } catch (err) {
        return NextResponse.json(
            { message: "UPDATE service failed", err },
            { status: 500 }
        )
    }
}

// DELETE
export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        const res = await fetch(
            `${API_URL}/api/admin/services/${id}`,
            {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    Authorization: req.headers.get("authorization") || "",
                },
            }
        )

        const data = await res.json()

        return NextResponse.json(data, { status: res.status })
    } catch (err) {
        return NextResponse.json(
            { message: "DELETE service failed", err },
            { status: 500 }
        )
    }
}