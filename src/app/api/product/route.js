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
    let result = await prisma.product.aggregate({
      _count: { id: true },
      _avg: { price: true },
      _min: { price: true },
      _max: { price: true },
      _sum: { price: true },
    });

    //insert one or many data
    // let result = await prisma.product.create({
    //   data: reqBody,
    // });

    // Update by id
    // let result = await prisma.product.update({
    //   where: { id: id },
    //   data: reqBody,
    // });

    // Delete by id
    // let result = await prisma.product.delete({
    //   where: { id: id },
    // });

    // Read Data from database
    //let result = await prisma.product.findMany();

    return NextResponse.json({ status: "success", data: result });
  } catch (err) {
    return NextResponse.json({ status: "fail", data: err.message });
  }
}
