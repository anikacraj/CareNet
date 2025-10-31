import RouteLoader from "@/components/ui/RouteLoader";// Adjust path if needed

function MyApp({ Component, pageProps }) {
  return (
    <>
      <RouteLoader />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
