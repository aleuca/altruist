
import (
	net
	net/http
)

type Adder struct {
	inPorts []int
	outPorts []int
}

var (
	int highestPort = 1000
)

func allocatePort() int {
	conn = true
	err = false
	for conn != nil {
		highestPort += 1

		conn, err = net.DialTimeout("tcp", net.JoinHostPort("", highestPort), timeout)
	}

	return highestPort
}

func createAdder() Adder {
	return Adder{inPorts[allocatePort(), allocatePort(), allocatePort()], outPorts[allocatePort(), allocatePort()]}
}

// func handler(w http.ResponseWriter, r *http.Request) {
// 	params := strings.Split(strings.Trim(r.URL.Path, "/"), "/")
// 	switch numParams := len(params); numParams {
// 	case 0:
// 		// TODO: api docs
// 		http.NotFound(w, r)
// 	default:
// 		switch params[0] {
// 		case "whales":
// 			whaleRoutes(w, r, params)
// 		default:
// 			http.NotFound(w, r)
// 		}
// 	}
// }

// http.HandleFunc("/", handler)

func main() {
	adder := createAdder()
	fmt.Print(adder)
}