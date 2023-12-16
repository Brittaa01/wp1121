// TODO: 4. Call the signOut() function when the button is clicked
// hint: You may want to change the first line of this file
//import { signOut } from "next-auth/react";
//import { publicEnv } from "@/lib/env/public";
import { Button } from "@/components/ui/button";

export default function SignOutButton() {
  return <Button variant={"outline"} data-testid="sign-out-button" 
  //signOutCallback={() => signOut()}
  //onClick={async () => {signOut()}}
  >Sign Out</Button>;
}
// TODO: 4. end
