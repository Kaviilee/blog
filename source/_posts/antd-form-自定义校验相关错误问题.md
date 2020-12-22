---
title: antd form 自定义校验相关错误问题
tags:
  - Antd v4
  - react
categories:
    - [框架]
date: 2020-12-09 14:17:35
---


在使用 ant design form 组件自定义校验，进行远程校验数据唯一性的时候，遇到的一些问题以及解决方法。

<!-- more -->

## 问题背景

使用 [ant design form](https://ant.design/components/form-cn/) 设计表单时，某些字段需要进行远程校验，比如：用户名(username)，手机号(mobile)，就需要自定义校验规则。

## 错误示例

在需要进行校验的地方，之前错误的写法

```tsx
/** 验证字段唯一性
* @param key 字段key
* @param value 字段value
*/
const validateUnique = (key: string, value: string): any => {
  if (value) {
    remoteValidate({ key, value }).then((res: any) => {
      if (res.success) {
        return res.data.isUnique;
      }
    }).catch(e => {
      message.error(e)
      return false
    })
  }
}

<Form.Item label="用户名" name="username" required rules={[{ required: true, message: '请输入用户名' }, () => ({
  validator(_, value) {
    if (!value || validateUnique('username', value)) {
      return Promise.resolve()
    }
    return Promise.reject('已存在相同的用户名')
  }
})]}>
  <Input />
</Form.Item>
```

以上的写法能够校验字段值为空时的错误，但是在进行远程校验字段唯一性的时候，就无法验证。
`validateUnique` 返回的值一直为 `undefined`，使得错误一直是 `已存在相同的用户名`。

## 解决方法

为了解决校验一直返回 `undefined`，我们修改写法为

```tsx
<Form.Item label="用户名" name="username" required rules={[{ required: true, message: '请输入用户名' }, () => ({
  validator(_, value) {
    return new Promise((resolve, reject) => {
      if (value) {
        remoteValidate({ key: 'username', value }).then(async (res) => {
          if (res.data.isUnique) {
            return resolve()
          }
          return reject('已存在相同的手机号')
        })
      } else {
        return reject()
      }
    })
  }
})]}>
  <Input />
</Form.Item>
```
