package com.skewer.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.skewer.service.MailService;

@Controller
public class MainController {

    @Autowired
    private MailService mailService;

    @RequestMapping("/")
    public String home() {
        return "client/container";
    }

    @RequestMapping(value = { "/{path}" })
    public String home(@PathVariable("path") String path) {
        String result = "client/container";

        if ("supplier".equalsIgnoreCase(path) || "client".equalsIgnoreCase(path) || "order".equalsIgnoreCase(path)
                || "admin".equalsIgnoreCase(path) || "product".equalsIgnoreCase(path)) {
            result = path + "/container";
        }

        return result;
    }

    @RequestMapping(value = "/replicate", method = RequestMethod.POST)
    @ResponseBody
    public String replicate(@RequestParam Map<String, String> data) {
        mailService.send(data);
        return "OK";
    }

}
