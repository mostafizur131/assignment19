import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req, res) {
  BigInt.prototype.toJSON = function () {
    return this.toString();
  };
  try {
    const { searchParams } = new URL(req.url);
    const reqBody = await req.json();
    const id = parseInt(searchParams.get("id"));
    console.log(reqBody);
    //insert one or many records
    let result = await prisma.category.create({
      data: reqBody,
    });

    // Update by id
    // let result = await prisma.category.update({
    //   where: { id: id },
    //   data: reqBody,
    // });

    // Delete by id
    // let result = await prisma.category.delete({
    //   where: { id: id },
    // });

    // Read Data from database
    //let result = await prisma.category.findMany();

    return NextResponse.json({ status: "success", data: result });
  } catch (err) {
    return NextResponse.json({ status: "Failure", message: err.message });
  }
}
