'use client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { IDestinations } from "@/lib/type/destinations";
import { useRouter } from "next/navigation";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const DeleteDestination = ({destination}: {destination: IDestinations}) => {
  const router = useRouter();

  const handleDeleteDestination= async()=>{
    const token = await getTokenFromClient();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destinations/${destination._id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    if(res.ok){
      router.push('/destinations')
      router.refresh()
    }
  }
  return (
    <div>
       <AlertDialog>
  <AlertDialogTrigger render={<Button
            variant="outline"
            className="h-9 rounded-sm border-red-200 px-4 text-xs font-medium text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="size-3.5" />
            Delete
          </Button>}>
    Show Dialog
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete this
        destination from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleDeleteDestination}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
    </div>
  );
};

export default DeleteDestination;