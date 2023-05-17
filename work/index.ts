import http, { ServerResponse } from "http";

const port: number = 3122;

interface iData {
  success: boolean;
  status: number;
  getData: null | {}[];
}
const server: http.Server<
  typeof http.IncomingMessage,
  typeof http.ServerResponse
> = http.createServer(
  (req: http.IncomingMessage, res: ServerResponse<http.IncomingMessage>) => {
    const { method, url } = req;

    let status: number = 404;
    // let data: {}[] | null = null;
    let success: boolean = false;

    let data = [{ item: "React" }, { item: "Node" }];

    res.writeHead(status, { "Content-Type": "application/json" });

    let entry: iData = {
      status,
      success,
      getData: data,
    };

    let body: any = [];
    req.on("data", (chunk: string) => {
      body.push(chunk);
    });

    req.on("end", () => {
      if (method === "GET" && url === "/") {
        entry.status = 200;
        entry.success = true;
        entry.getData = data;
      } else if (method === "POST" && url === "/") {
        data.push(JSON.parse(body));
        console.log(data);
        entry.status = 201;
        entry.success = true;
        entry.getData = data;
      } else {
        entry.status = 404;
        entry.success = false;
        entry.getData = null;
      }

      console.log(entry);
      res.end(JSON.stringify(entry));
    });
  },
);

server.listen(port, () => {
  console.log("server listening on port " + port);
});
