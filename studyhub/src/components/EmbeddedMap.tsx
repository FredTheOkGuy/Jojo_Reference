interface EmbeddedMapProps {
  roomLabel?: string;
  mapLocation?: string;
}

function buildMapSrc(mapLocation: string) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const encodedLocation = encodeURIComponent(mapLocation);

  if (apiKey) {
    return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodedLocation}`;
  }

  return `https://www.google.com/maps?q=${encodedLocation}&output=embed`;
}

export default function EmbeddedMap({
  roomLabel,
  mapLocation,
}: EmbeddedMapProps) {
  const cleanLocation = mapLocation?.trim();
  const cleanRoom = roomLabel?.trim();

  if (!cleanLocation) {
    return (
      <div className="bg-[#faf8f4] border border-[#ddd8cc] rounded-[14px] p-4 shadow-sm">
        <div className="text-xs font-bold uppercase tracking-[0.08em] text-[#9a9282] mb-2">
          🗺️ Map Location
        </div>

        <p className="text-sm text-[#9a9282] font-medium">
          No physical map location was added for this group yet.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#faf8f4] border border-[#ddd8cc] rounded-[14px] overflow-hidden shadow-sm">
      <div className="p-4 pb-3">
        <div className="text-xs font-bold uppercase tracking-[0.08em] text-[#9a9282] mb-2">
          🗺️ Map Location
        </div>

        <div className="font-bold text-base text-[#1a1610]">
          {cleanLocation}
        </div>

        {cleanRoom && (
          <div className="text-sm text-[#9a9282] font-medium mt-0.5">
            Room: {cleanRoom}
          </div>
        )}
      </div>

      <iframe
        title={`Map for ${cleanLocation}`}
        src={buildMapSrc(cleanLocation)}
        className="w-full h-56 border-0 block bg-[#edeae2]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
