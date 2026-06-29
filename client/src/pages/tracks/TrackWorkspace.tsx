import { useParams } from "react-router-dom";

export default function TrackWorkspace() {
  const { trackId } = useParams();

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold">Track Workspace</h1>

      <p className="mt-4 text-slate-400">
        Track ID: {trackId}
      </p>
    </div>
  );
}