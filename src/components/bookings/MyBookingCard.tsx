'use client'
import {
  CalendarDays,
  CircleCheck,
  Clock,
  Eye,
  Globe,
  Trash,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import type { IBooking } from "@/lib/type/bookings";
import { useRouter } from "next/navigation";
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

const FALLBACK_IMAGE = "/images/Banner.png";

const formatDate = (value?: string) => {
  if (!value) return "To be announced";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export function MyBookingCard({ booking }: { booking: IBooking }) {
  const router = useRouter();
  const isPending = booking.status?.toLowerCase() === "pending";
  const isCancelled = booking.status?.toLowerCase() === "cancelled";
  const statusLabel = isCancelled ? "Cancelled" : isPending ? "Pending" : "Confirmed";

  const bookingId = booking._id.length > 10 ? booking._id.slice(-8) : booking._id;

  const handleDeleteBooking = async()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-bookings/${booking._id}`,{
      method: "DELETE"
    })

    if(res.ok){
      router.refresh()
    }
  }

  return (
    <article className="border border-neutral-200 bg-white p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
        <div className="aspect-video w-full shrink-0 overflow-hidden sm:aspect-auto sm:h-37.5 sm:w-71.25">
          {/* The API returns images from arbitrary hosts, so use a plain img here. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={booking.imageUrl || FALLBACK_IMAGE}
            alt={booking.name}
            loading="lazy"
            className="size-full object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col justify-between gap-4">
          <div>
            <span
              className={`inline-flex items-center gap-1 rounded-sm border px-2 py-0.5 text-[11px] font-medium ${
                isCancelled
                  ? "border-red-200 bg-red-50 text-red-600"
                  : isPending
                    ? "border-orange-200 bg-orange-50 text-orange-600"
                    : "border-green-200 bg-green-50 text-green-700"
              }`}
            >
              {isCancelled ? (
                <Trash className="size-3" />
              ) : isPending ? (
                <Clock className="size-3" />
              ) : (
                <CircleCheck className="size-3" />
              )}
              {statusLabel}
            </span>

            <h2 className="mt-2 text-xl leading-tight font-semibold">
              {booking.name}
            </h2>

            <dl className="mt-2 space-y-1 text-xs text-neutral-600">
              <div className="flex items-center gap-1.5">
                <CalendarDays className="size-3.5 shrink-0" />
                <dt className="sr-only">Departure</dt>
                <dd>Departure: {formatDate(booking.departureDate)}</dd>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="size-3.5 shrink-0" />
                <dt className="sr-only">Booking ID</dt>
                <dd title={booking._id}>Booking ID: {bookingId}</dd>
              </div>
            </dl>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-3">
            <p className="text-brand text-2xl leading-none font-semibold">
              ${booking.price}
            </p>

            <div className="flex items-center gap-3">

              <AlertDialog>
              <AlertDialogTrigger render={
                <Button
                type="button"
                variant="outline"
                className="h-8 rounded-sm border-red-200 px-3 text-xs font-medium text-red-500 hover:bg-red-50 hover:text-red-600"
              >
                <Trash className="size-3.5" />
                Cancel
              </Button>
              }>
                Show Dialog
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your booking
                    from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
               
                  <AlertDialogAction  onClick={handleDeleteBooking}
                   >Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

              
              <Button
                type="button"
                className="bg-brand hover:bg-brand/90 h-8 rounded-sm px-3 text-xs font-medium text-white"
              >
                <Eye className="size-3.5" />
                View
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default MyBookingCard;
