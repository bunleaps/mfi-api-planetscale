import Head from "next/head";
import { useState } from "react";

export default function Home({ data }) {
  const [microName, setMicroName] = useState("");
  const [microRange, setMicroRange] = useState("");
  const [microTerms, setMicroTerms] = useState("");
  const [microAssets, setMicroAssets] = useState("");
  const [APIResponse, setAPIResponse] = useState(data);

  const readDB = async () => {
    try {
      const response = await fetch("/api/microfi", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      setAPIResponse(await response.json());
      if (response.status !== 200) {
        console.log("something went wrong");
      } else {
        setMicroName("");
        setMicroRange("");
        setMicroTerms("");
        setMicroAssets("");
        console.log("form submitted successfully !!!");
      }
    } catch (error) {
      console.log("Error reading from database", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { microName, microRange, microTerms, microAssets };
    try {
      const response = await fetch("/api/microfi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (response.status !== 200) {
        console.log("something went wrong");
      } else {
        setMicroName("");
        setMicroRange("");
        setMicroTerms("");
        setMicroAssets("");
        readDB();
        console.log("form submitted successfully !!!");
      }
    } catch (error) {
      console.log("there was an error submitting", error);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col divide-y">
      <Head>
        <title>Microfinance Database</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex p-5">
        <form
          action="#"
          className="p-5 mx-3 border-4 rounded-md bg-gray-400"
          method="POST"
          onSubmit={(e) => handleSubmit(e)}
        >
          <h3 className="text-2xl font-bold">Microfinance Database</h3>
          <label className="block">Micro Name</label>
          <input
            onChange={(e) => setMicroName(e.target.value)}
            type="text"
            name="micro-name"
            id="micro-name"
            className="my-2 border-2 w-full"
          />
          <br />
          <label className="block">Micro Range</label>
          <input
            onChange={(e) => setMicroRange(e.target.value)}
            type="text"
            name="micro-range"
            id="micro-range"
            className="my-2 border-2 w-full"
          />
          <br />
          <label className="block">Micro Terms</label>
          <input
            onChange={(e) => setMicroTerms(e.target.value)}
            type="text"
            name="micro-terms"
            id="micro-terms"
            className="my-2 border-2 w-full"
          />
          <br />
          <label className="block">Micro Assets</label>
          <input
            onChange={(e) => setMicroAssets(e.target.value)}
            type="text"
            name="micro-assets"
            id="micro-assets"
            className="my-2 border-2 w-full"
          />
          <br />
          <button
            type="submit"
            className="bg-indigo-900 my-2 py-2 px-3 text-white rounded  w-full"
          >
            Submit
          </button>
        </form>
        <div>
          <table className="table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Micro Name</th>
                <th className="px-4 py-2">Micro Range</th>
                <th className="px-4 py-2">Micro Terms</th>
                <th className="px-4 py-2">Micro Assets</th>
              </tr>
            </thead>
            <tbody>
              {APIResponse.map((microfi) => (
                <tr key={microfi.id}>
                  <td className="border px-4 py-2">{microfi.id}</td>
                  <td className="border px-4 py-2">{microfi.microName}</td>
                  <td className="border px-4 py-2">{microfi.microRange}</td>
                  <td className="border px-4 py-2">{microfi.microTerms}</td>
                  <td className="border px-4 py-2">{microfi.microAssets}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <span>Made with ❤ </span>
      <span>
        <b>Tech Stack:</b> NextJS, PrismaSchema, PlanetScale Database(MySQL)
      </span>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch("https://mfi-api-planetscale.vercel.app/api/microfi");
  const data = await res.json();

  return {
    props: { data },
  };
}
