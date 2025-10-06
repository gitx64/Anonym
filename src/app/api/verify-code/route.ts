import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";

export async function POST(req: Request, res: Response) {
  await dbConnect();

  try {
    const { username, code, email } = await res.json();

    const decodedUsername = decodeURIComponent(username);
    const user = await UserModel.findOne({ username: decodedUsername });
    const userEmail = user?.email;
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "user not found",
        },
        { status: 404 }
      );
    }

    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true;
      await user.save();

      return Response.json(
        {
          success: true,
          message: "Account Verified Successfully",
        },
        { status: 200 }
      );
    } else if (!isCodeNotExpired) {
      user.isVerified = false;
      await user.save();

      return Response.json(
        {
          success: false,
          message: "Verification Code is expired, please sign up again to get a new code",
        },
        { status: 500 }
      );
    } else{
      user.isVerified = false;
      await user.save();

      return Response.json(
        {
          success: false,
          message: `Verification Code is not valid, please enter the correct code sent to the registered email ${userEmail}`,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error({ message: "Error checking username ", error });
    return Response.json(
      {
        success: false,
        message: "Error Checking Username",
      },
      { status: 500 }
    );
  }
}
