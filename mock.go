package main

import (
	"bytes"
	"fmt"
	"github.com/CloudyKit/jet/v6"
	xerr "github.com/goclub/error"
	xhttp "github.com/goclub/http"
	xjson "github.com/goclub/json"
	"net/http"
	"os"
	"path"
	"reflect"
)

var view *jet.Set

func init() {
	projectPath := path.Join(os.Getenv("GOPATH"), "src/github.com/2type/vue2-project")
	loader := jet.NewOSFileSystemLoader(projectPath)
	opts := []jet.Option{}
	opts = append(opts, jet.InDevelopmentMode())
	opts = append(opts, jet.WithDelims("[[", "]]"))
	view = jet.NewSet(
		loader,
		opts...,
	)
	view.AddGlobalFunc("xjson", func(a jet.Arguments) reflect.Value {
		v := a.Get(0).Interface()
		buffer := bytes.NewBuffer(nil)
		err := xjson.NewEncoder(buffer).Encode(v)
		if err != nil {
			return reflect.ValueOf("encode json fail")
		}
		return reflect.ValueOf(buffer.Bytes())
	})
	view.AddGlobalFunc("xsrc", func(a jet.Arguments) reflect.Value {
		v := a.Get(0).Interface()
		file := fmt.Sprintf("%s", v)
		out := "http://localhost:3000/" + file
		return reflect.ValueOf(out)
	})
}

type TemplateRender struct {
}

func (TemplateRender) Render(templatePath string, data interface{}, w http.ResponseWriter) (err error) {
	t, err := view.GetTemplate(templatePath)
	if err != nil {
		return
	}
	return t.Execute(w, nil, data)
}

type O map[string]interface{}

func main() {
	ms := xhttp.NewMockServer(xhttp.MockServerOption{
		DefaultReply: O{
			"pass": xerr.Resp{},
			"fail": xerr.NewResp(1, "错误消息"),
		},
		Render: TemplateRender{},
	})
	defer ms.Listen(3422)

	ms.URL(xhttp.Mock{
		Route: xhttp.Route{xhttp.GET, "/"},
		Reply: xhttp.MockReply{
			"pass": O{
				"name": "nimo",
			},
		},
		Render: "./pages/single_page/index.html",
	})

	ms.URL(xhttp.Mock{
		Route: xhttp.Route{xhttp.GET, "/news"},
		Reply: xhttp.MockReply{
			"pass": O{
				"list": []O{
					{
						"id":    1,
						"title": "news title a",
					},
					{
						"id":    2,
						"title": "news title b",
					},
				},
			},
		},
	})
}
