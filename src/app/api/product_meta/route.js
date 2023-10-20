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

    //insert one or many data
    let result = await prisma.product_meta.create({
      data: reqBody,
    });

    // Update by id
    // let result = await prisma.product_meta.update({
    //   where: { id: id },
    //   data: reqBody,
    // });

    // Delete by id
    // let result = await prisma.product_meta.delete({
    //   where: { id: id },
    // });

    // Read Data from database
    //let result = await prisma.product_meta.findMany();

    return NextResponse.json({ status: "success", data: result });
  } catch (err) {
    return NextResponse.json({ status: "fail", data: err.message });
  }
}
