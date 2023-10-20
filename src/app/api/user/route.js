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
    // let result = await prisma.user.createMany({
    //   data: reqBody,
    // });

    // Update by id
    // let result = await prisma.user.update({
    //   where: { id: id },
    //   data: reqBody,
    // });

    // Delete
    let user = prisma.user.delete({
      where: { id: id },
    });

    let cart = prisma.cart.delete({
      where: { id: id },
    });

    let product = prisma.product.delete({
      where: { id: id },
    });

    let order = prisma.order.delete({
      where: { id: id },
    });

    let result = await prisma.$transaction([user, cart, product, order]);

    // Read Data from database
    //let result = await prisma.user.findMany();

    return NextResponse.json({ status: "success", data: result });
  } catch (err) {
    return NextResponse.json({ status: "fail", data: err.message });
  }
}
