import EventCard from '../../../../../../components/ui/events/EventCard'
export default function BentogLayout({ data }) { return <div className="grid min-h-[300px] grid-rows-2 gap-2 md:h-full md:min-h-0 md:w-1/2"><EventCard {...data.top} variant="top"/><div className="grid min-h-0 grid-cols-2 gap-2"><EventCard {...data.bottomLeft}/><EventCard {...data.bottomRight}/></div></div> }
