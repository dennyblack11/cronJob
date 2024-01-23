import { Request, Response } from "express";
import { CronJob } from "cron";
import moment from "moment";
import userModel from "../model/userModel";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await userModel.create({
      email,
      plan: "free",
    });

    return res.status(201).json({
      message: "User Created",
      data: user,
    });
  } catch (error) {
    return error;
  }
};

export const subForThreeMonth = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const aheadTime = new Date().setMonth(new Date().getMonth() + 3);
    console.log(aheadTime);
    const momented = moment(aheadTime).format("L");

    const split = momented.split("/");

    const read = await userModel.findOneAndUpdate(
      { email },
      {
        planBegins: moment(new Date().getTime()).format("L"),
        planEnds: momented,
        plan: "bronze",
        expired: false,
      }
    );

    const job = new CronJob(
      `0 0 ${split[1]} ${split[0].replace(/0+$/, "")} *`,
      async function () {
        await userModel.findByIdAndUpdate(
          read?._id,
          { expired: true },
          { new: true }
        );
      },
      null,
      true,
      "America/Los_Angeles"
    );

    return res.status(201).json({
      message: "Sub Plan for three months Created",
      data: read,
    });
  } catch (error) {
    return error;
  }
};

export const searchAll = async (req: Request, res: Response) => {
  try {
    const user = await userModel.find();

    return res.status(201).json({
      message: "Successfully search for all plans",
      data: user,
    });
  } catch (error) {
    return error;
  }
};
