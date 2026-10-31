'use client'
import { authClient } from '@/lib/auth-client';
import { IDestinations } from '@/lib/type/destinations';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';


// const formatDate = (value: string) => {
//   const [year, month, day] = value.split("-");
//   if (!year || !month || !day || year.length !== 4) return value;

//   return `${month}/${day}/${year}`;
// };
const perks = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
];

const BookingCard = ({destination}: {destination: IDestinations}) => {
  const {data: session} = authClient.useSession()
  const user = session?.user;

  const handleBooking = async(event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault()

    const formData = new FormData(event.currentTarget);
    const departureDate = String(formData.get("departureDate") ?? "");

    const data = {
      userName: user?.name,
      email: user?.email,
      image: user?.image,
      name: destination.name,
      country: destination.country,
      category: destination.category,
      price: destination.price,
      duration: destination.duration,
      departureDate,
      imageUrl: destination.imageUrl,
      description: destination.description,
      bookingDate: new Date(),
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking`
, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    const bookingdata = await res.json();
    console.log(bookingdata);
  }
  return (
    <div>
      <aside className="h-fit border border-neutral-200 bg-white p-5 shadow-sm">
          <p className="text-xs text-neutral-500">Starting from</p>
          <p className="text-brand mt-1 text-3xl font-semibold">
            ${destination.price}
          </p>
          <p className="mt-1 text-xs text-neutral-500">per person</p>
            {/* Booking Form */}
            <form onSubmit={handleBooking}>
          <Input
            type="date"
            name="departureDate"
            aria-label="Departure date"
            defaultValue={destination.departureDate}
            className="mt-4 h-9 border-0 bg-neutral-100 px-3 text-xs focus-visible:ring-0"
          />
          <Button
          type='submit'
            className="bg-brand mt-4 flex h-10 w-full items-center justify-center gap-1.5 rounded-sm text-sm font-medium text-white transition-colors hover:bg-brand/90">
            <ArrowRight className="size-4" />
            Book Now
          </Button>
           </form>
          

          <ul className="mt-4 space-y-2.5">
            {perks.map((perk) => (
              <li
                key={perk}
                className="flex items-center gap-2 text-xs text-neutral-600"
              >
                <Check className="size-3.5 shrink-0 text-green-600" />
                {perk}
              </li>
            ))}
          </ul>
        </aside>
    </div>
  );
};

export default BookingCard;