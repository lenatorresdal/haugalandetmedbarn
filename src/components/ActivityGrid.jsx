export default function ActivityGrid({ children, ...props }) {
  return <div {...props} className="grid">{children}</div>;
}
