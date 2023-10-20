import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req, res) {
  BigInt.prototype.toJSON = function () {
    return this.toString();
  };
  try {
    const { searchParams } = new URL(req.url);
    const reqBody = await req.json();
    const id = parseInt(searchParams.get("id"));

    // Aggregate the results

    let result = await prisma.order.groupBy({
      by: ["city"],
      _count: { id: true },
    });

    //insert one or many data
    // let result = await prisma.order.create({
    //   data: reqBody,
    // });

    // Update by id
    // let result = await prisma.order.update({
    //   where: { id: id },
    //   data: reqBody,
    // });

    // Delete by id
    // let result = await prisma.order.delete({
    //   where: { id: id },
    // });

    // Read Data from database
    //let result = await prisma.order.findMany();

    return NextResponse.json({ status: "success", data: result });
  } catch (err) {
    return NextResponse.json({ status: "fail", data: err.message });
  }
}
