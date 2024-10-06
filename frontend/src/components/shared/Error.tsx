interface ErrorProps {
  message?: string;
}

export default function Error({ message }: ErrorProps) {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] border border-dashed p-4">
      <div className="text-red-500">{message || "Something went wrong"}</div>
    </div>
  );
}
