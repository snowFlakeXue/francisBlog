# FrancisBlog接口文档

## Version

```text
v1.0
```

## Host

```text
http://127.0.0.1
```

* 完整访问路径: [http://url:8088/francisblog/api/v1/xxx]('http://url:8088/francisblog/api/v1/xxx')
* 返回结果示例:

```json
{
    "code": 0,     //返回码，0代表成功，1代表失败
    "message": "", //失败时存放的错误信息
    "data": ""   //成功返回的信息或对象
}
```

## API

### 1. 网站基本信息

#### 1. 获取网站基本信息

* 接口名: /site
* 请求类型: GET
* 功能说明:

    | 参数类型      | 字段名    |  说明  |  备注  |
    | :--------:  | :--------:   | :-------: | :-------: |

* 响应示例:

```json
{
  "code": 0,
  "data": [
    {
      "siteId": 1,
      "siteTitle": "string",
      "siteSubtitle": "string",
      "siteDescription": "string",
      "siteLogo": "string",
      "siteAvatar": "string",
    }
  ],
  "message": "string"
}
```

#### 2. 修改网站基本信息

* 接口名: /site
* 请求类型: PUT
* 功能说明:

    | 参数类型      | 字段名    |  说明  |  备注  |
    | :--------:  | :--------:   | :-------: | :-------: |
    | int  | siteId   | id | 无 |
    | String  | siteTitle   | 标题 | 无 |
    | String  | siteSubtitle   | 副标题 | 无 |
    | String  | siteDescription   | 站点描述 | 无 |
    | String  | siteLogo   | 站点logo | 无 |
    | String  | siteAvatar   | 站点站长头像 | 无 |

* 响应示例:

```json
{
  "code": 0,
  "data": "",
  "message": "更新成功"
}
```

### 2. 管理员

#### 1. 获取所有管理员

* 接口名: /admin
* 请求类型: GET
* 功能说明:

    | 参数类型      | 字段名    |  说明  |  备注  |
    | :--------:  | :--------:   | :-------: | :-------: |

* 响应示例:

```json
{
  "code": 0,
  "data": [
    {
      "userAccount": "string",
      "username": "string",
      "userPassword": "string",
      "userAvatar": "string",
    }
  ],
  "message": "string"
}
```

#### 2. 新增管理员

* 接口名: /admin
* 请求类型: POST
* 功能说明:

    | 参数类型      | 字段名    |  说明  |  备注  |
    | :--------:  | :--------:   | :-------: | :-------: |
    | String      | userAccount      |   账号    |   无    |
    | String      | username      |   用户名    |   无    |
    | String      | userPassword      |   密码    |   无    |
    | String      | userAvatar      |   用户头像    |   无    |

* 响应示例:

```json
{
  "code": 0,
  "data": "string",
  "message": "string"
}
```

#### 3. 更新管理员信息

* 接口名: /admin
* 请求类型: PUT
* 功能说明:

    | 参数类型      | 字段名    |  说明  |  备注  |
    | :--------:  | :--------:   | :-------: | :-------: |
    | String      | userAccount      |   账号    |   无    |
    | String      | username      |   用户名    |   无    |
    | String      | userPassword      |   密码    |   无    |
    | String      | userAvatar      |   用户头像    |   无    |

* 响应示例:

```json
{
  "code": 0,
  "data": "string",
  "message": "string"
}
```

#### 4. 删除指定管理员

* 接口名: /admin/{userAccount}
* 请求类型: DELETE
* 功能说明:

    | 参数类型      | 字段名    |  说明  |  备注  |
    | :--------:  | :--------:   | :-------: | :-------: |

* 响应示例:

```json
{
  "code": 0,
  "data": "string",
  "message": "string"
}
```

#### 6. 登录

* 接口名: /sign_in
* 请求类型: POST
* 功能说明:

    | 参数类型      | 字段名    |  说明  |  备注  |
    | :--------:  | :--------:   | :-------: | :-------: |
    | String      | userAccount      |   账号    |   无    |
    | String      |
userPassword      |   密码    |   无    |

* 响应示例:

```json
{
  "code": 0,
  "data": "string",
  "message": "string"
}
```

### 3. 网站标签

#### 1. 添加网站标签

* 接口名: /site_tag
* 请求类型: POST
* 功能说明:

    | 参数类型      | 字段名    |  说明  |  备注  |
    | :--------:  | :--------:   | :-------: | :-------: |
    | String      | siteTagName      |  标签名    |   无    |
    | String      | siteTagColor      |   标签颜色    |   无    |
    | String      | siteTagDescription      |   标签描述    |   无    |

* 响应示例:

```json
{
  "code": 0,
  "data": "string",
  "message": "string"
}
```

#### 2. 获取所有网站标签

* 接口名: /site_tag
* 请求类型: GET
* 功能说明:

    | 参数类型      | 字段名    |  说明  |  备注  |
    | :--------:  | :--------:   | :-------: | :-------: |

* 响应示例:

```json
{
  "code": 0,
  "data": [
    {
      "siteTagId": 1,
      "siteTagName": "string",
      "siteTagColor": "string",
      "siteTagDescription": "string",
    },{
      "siteTagId": 2,
      "siteTagName": "string",
      "siteTagColor": "string",
      "siteTagDescription": "string",
    }
  ],
  "message": "string"
}
```

#### 3. 删除指定网站标签

* 接口名: /site_tag/{site_tag_id}
* 请求类型: DELETE
* 功能说明:

    | 参数类型      | 字段名    |  说明  |  备注  |
    | :--------:  | :--------:   | :-------: | :-------: |

* 响应示例:

```json
{
  "code": 0,
  "data": "string",
  "message": "string"
}
```

#### 4. 修改指定网站标签

* 接口名: /site_tag/{site_tag_id}
* 请求类型: PUT
* 功能说明:

    | 参数类型      | 字段名    |  说明  |  备注  |
    | :--------:  | :--------:   | :-------: | :-------: |
    | String      | siteTagName      |  标签名    |   无    |
    | String      | siteTagColor      |   标签颜色    |   无    |
    | String      | siteTagDescription      |   标签描述    |   无    |

* 响应示例:

```json
{
  "code": 0,
  "data": "",
  "message": "string"
}
```

### 4. 网站icon

#### 1. 添加网站icon

* 接口名: /site_icon
* 请求类型: POST
* 功能说明:

    | 参数类型      | 字段名    |  说明  |  备注  |
    | :--------:  | :--------:   | :-------: | :-------: |
    | String      | siteIconName      |  icon名称    |   无    |
    | String      | siteIconColor      |   icon颜色    |   无    |
    | String      | siteIconUrl     |   icon Url    |   无    |
    | String      | siteIconValue     |   icon 值    |   无    |
    | String      | siteIconDescription      |   标签描述    |   无    |

* 响应示例:

```json
{
  "code": 0,
  "data": "string",
  "message": "string"
}
```

#### 2. 获取所有网站icon

* 接口名: /site_icon
* 请求类型: GET
* 功能说明:

    | 参数类型      | 字段名    |  说明  |  备注  |
    | :--------:  | :--------:   | :-------: | :-------: |

* 响应示例:

```json
{
  "code": 0,
  "data": [
    {
      "siteIconId": 1,
      "siteIconName": "string",
      "siteIconColor": "string",
      "siteIconUrl": "string",
      "siteIconValue": "string",
      "siteIconDescription": "string",
    },{
      "siteIconId": 2,
      "siteIconName": "string",
      "siteIconColor": "string",
      "siteIconUrl": "string",
      "siteIconValue": "string",
      "siteIconDescription": "string",
    }
  ],
  "message": "string"
}
```

#### 3. 删除指定网站icon

* 接口名: /site_icon/{site_icon_id}
* 请求类型: DELETE
* 功能说明:

    | 参数类型      | 字段名    |  说明  |  备注  |
    | :--------:  | :--------:   | :-------: | :-------: |

* 响应示例:

```json
{
  "code": 0,
  "data": "string",
  "message": "string"
}
```

#### 4. 修改指定网站icon

* 接口名: /site_icon/{site_icon_id}
* 请求类型: PUT
* 功能说明:

    | 参数类型      | 字段名    |  说明  |  备注  |
    | :--------:  | :--------:   | :-------: | :-------: |
    | String      | siteIconName      |  icon名称    |   无    |
    | String      | siteIconColor      |   icon颜色    |   无    |
    | String      | siteIconUrl     |   icon Url    |   无    |
    | String      | siteIconValue     |   icon 值    |   无    |
    | String      | siteIconDescription      |   标签描述    |   无    |

* 响应示例:

```json
{
  "code": 0,
  "data": "",
  "message": "string"
}
```

### 5. 网站友情链接

#### 1. 添加网站友情链接

* 接口名: /site_friend_link
* 请求类型: POST
* 功能说明:

    | 参数类型      | 字段名    |  说明  |  备注  |
    | :--------:  | :--------:   | :-------: | :-------: |
    | String      | friendLinkName      |  友情链接名称    |   无    |
    | String      | friendLinkIconValue      |   icon值    |   无    |
    | String      | friendLinkIconColor     |   icon 颜色    |   无    |
    | String      | friendLinkIconUrl     |   icon url    |   无    |
    | String      | friendLinkDescription      |   描述    |   无    |

* 响应示例:

```json
{
  "code": 0,
  "data": "string",
  "message": "string"
}
```

#### 2. 获取所有网站友链

* 接口名: /site_friend_link
* 请求类型: GET
* 功能说明:

    | 参数类型      | 字段名    |  说明  |  备注  |
    | :--------:  | :--------:   | :-------: | :-------: |

* 响应示例:

```json
{
  "code": 0,
  "data": [
    {
      "friendLinkId": 1,
      "friendLinkName": "string",
      "friendLinkIconValue": "string",
      "friendLinkIconColor": "string",
      "friendLinkUrl": "string",
      "friendLinkDescription": "string",
    },{
      "friendLinkId": 2,
      "friendLinkName": "string",
      "friendLinkIconValue": "string",
      "friendLinkIconColor": "string",
      "friendLinkUrl": "string",
      "friendLinkDescription": "string",
    }
  ],
  "message": "string"
}
```

#### 3. 删除指定网站友链

* 接口名: /site_friend_link/{friend_link_id}
* 请求类型: DELETE
* 功能说明:

    | 参数类型      | 字段名    |  说明  |  备注  |
    | :--------:  | :--------:   | :-------: | :-------: |

* 响应示例:

```json
{
  "code": 0,
  "data": "string",
  "message": "string"
}
```

#### 4. 修改指定网站友链

* 接口名: /site_friend_link/{friend_link_id}
* 请求类型: PUT
* 功能说明:

    | 参数类型      | 字段名    |  说明  |  备注  |
    | :--------:  | :--------:   | :-------: | :-------: |
    | String      | friendLinkName      |  友情链接名称    |   无    |
    | String      | friendLinkIconValue      |   icon值    |   无    |
    | String      | friendLinkIconColor     |   icon 颜色    |   无    |
    | String      | friendLinkIconUrl     |   icon url    |   无    |
    | String      | friendLinkDescription      |   描述    |   无    |

* 响应示例:

```json
{
  "code": 0,
  "data": "",
  "message": "string"
}
```

### 6. 网站广告

#### 1. 添加网站广告

* 接口名: /advertisement
* 请求类型: POST
* 功能说明:

    | 参数类型      | 字段名    |  说明  |  备注  |
    | :--------:  | :--------:   | :-------: | :-------: |
    | String      | advertisementName      |  广告名称    |   无    |
    | String      | advertisementPicture      |   广告图片地址    |   无    |
    | String      | advertisementUrl     |   广告链接    |   无    |
    | String      | advertisementDescription     |   广告描述    |   无    |

* 响应示例:

```json
{
  "code": 0,
  "data": "string",
  "message": "string"
}
```

#### 2. 获取所有网站广告

* 接口名: /advertisement
* 请求类型: GET
* 功能说明:

    | 参数类型      | 字段名    |  说明  |  备注  |
    | :--------:  | :--------:   | :-------: | :-------: |

* 响应示例:

```json
{
  "code": 0,
  "data": [
    {
      "advertisementId": 1,
      "advertisementName": "string",
      "advertisementPicture": "string",
      "advertisementUrl": "string",
      "advertisementDescription": "string",
    },{
      "advertisementId": 1,
      "advertisementName": "string",
      "advertisementPicture": "string",
      "advertisementUrl": "string",
      "advertisementDescription": "string",
    }
  ],
  "message": "string"
}
```

#### 3. 删除指定网站网站广告

* 接口名: /advertisement/{advertisement_id}
* 请求类型: DELETE
* 功能说明:

    | 参数类型      | 字段名    |  说明  |  备注  |
    | :--------:  | :--------:   | :-------: | :-------: |

* 响应示例:

```json
{
  "code": 0,
  "data": "string",
  "message": "string"
}
```

#### 4. 修改指定网站广告

* 接口名: /advertisement/{advertisement_id}
* 请求类型: PUT
* 功能说明:

    | 参数类型      | 字段名    |  说明  |  备注  |
    | :--------:  | :--------:   | :-------: | :-------: |
    | String      | advertisementName      |  广告名称    |   无    |
    | String      | advertisementPicture      |   广告图片地址    |   无    |
    | String      | advertisementUrl     |   广告链接    |   无    |
    | String      | advertisementDescription     |   广告描述    |   无    |

* 响应示例:

```json
{
  "code": 0,
  "data": "",
  "message": "string"
}
```

### 7. 相册

#### 1. 添加相册

* 接口名: /album
* 请求类型: POST
* 功能说明:

    | 参数类型      | 字段名    |  说明  |  备注  |
    | :--------:  | :--------:   | :-------: | :-------: |
    | String      | albumName      |  相册名称    |   无    |
    | String      | albumDescription      |   相册描述    |   无    |
    | String      | albumCover     |   相册的封面图片地址   |   无    |

* 响应示例:

```json
{
  "code": 0,
  "data": "string",
  "message": "string"
}
```

#### 2. 获取所有相册

* 接口名: /album

* 请求类型: GET

* 功能说明:

    | 参数类型 | 字段名 | 说明 | 备注 |
    | -------- | ------ | ---- | ---- |
    |          |        |      |      |
    | :--------: | :--------: | :-------: | :-------: |
    | ---------- | ---------- | --------- | --------- |
    |            |            |           |           |

    

* v-for="item in albums" :title="item.albumName" :key="item.albumId"

* 响应示例:

```json
{
  "code": 0,
  "data": [
    {
      "albumId": 1,
      "albumName": "string",
      "albumDescription": "string",
      "albumCover": "string",
    },{
      "albumId": 2,
      "albumName": "string",
      "albumDescription": "string",
      "albumCover": "string",
    }
  ],
  "message": "string"
}
```

#### 3. 删除指定相册

* 接口名: /album/{album_id}
* 请求类型: DELETE
* 功能说明:

    | 参数类型      | 字段名    |  说明  |  备注  |
    | :--------:  | :--------:   | :-------: | :-------: |

* 响应示例:

```json
{
  "code": 0,
  "data": "string",
  "message": "string"
}
```

#### 4. 修改指定相册

* 接口名: /album/{、}
* 请求类型: PUT
* 功能说明:

    | 参数类型      | 字段名    |  说明  |  备注  |
    | :--------:  | :--------:   | :-------: | :-------: |
    | String      | albumName      |  相册名称    |   无    |
    | String      | albumDescription      |   相册描述    |   无    |
    | String      | albumCover     |   相册的封面图片地址   |   无    |

* 响应示例:

```json
{
  "code": 0,
  "data": "",
  "message": "string"
}
```

### 8. 相册图片

#### 1. 添加相册图片

* 接口名: /album_picture
* 请求类型: POST
* 功能说明:

    | 参数类型      | 字段名    |  说明  |  备注  |
    | :--------:  | :--------:   | :-------: | :-------: |
    | String      | albumPictureName      |  图片名称    |   无    |
    | String      | albumPictureUrl      |   图片地址    |   无    |
    | String      | albumPictureCategory     |   图片所属相册   |   无    |
    | String      | albumPictureDescription     |   图片描述   |   无    |

* 响应示例:

```json
{
  "code": 0,
  "data": "string",
  "message": "string"
}
```

#### 2. 获取所属相册的所有图片

* 接口名: /album_picture/{album_id}
* 请求类型: GET
* 功能说明:

    | 参数类型      | 字段名    |  说明  |  备注  |
    | :--------:  | :--------:   | :-------: | :-------: |

* 响应示例:

```json
{
  "code": 0,
  "data": [
    {
      "albumPictureId": 1,
      "albumPictureName": "string",
      "albumPictureCategory": "string",
      "albumPictureUrl": "string",
      "albumPictureDescription": "string",
    },{
      "albumPictureId": 2,
      "albumPictureName": "string",
      "albumPictureCategory": "string",
      "albumPictureUrl": "string",
      "albumPictureDescription": "string",
    }
  ],
  "message": "string"
}
```

#### 3. 删除指定图片

* 接口名: /album_picture/{album_picture_id}
* 请求类型: DELETE
* 功能说明:

    | 参数类型      | 字段名    |  说明  |  备注  |
    | :--------:  | :--------:   | :-------: | :-------: |

* 响应示例:

```json
{
  "code": 0,
  "data": "string",
  "message": "string"
}
```

#### 4. 修改指定图片信息

* 接口名: /album_picture/{album_picture_id}
* 请求类型: PUT
* 功能说明:

    | 参数类型      | 字段名    |  说明  |  备注  |
    | :--------:  | :--------:   | :-------: | :-------: |
    | String      | albumPictureName      |  图片名称    |   无    |
    | String      | albumPictureUrl      |   图片地址    |   无    |
    | String      | albumPictureCategory     |   图片所属相册   |   无    |
    | String      | albumPictureDescription     |   图片描述   |   无    |

* 响应示例:

```json
{
  "code": 0,
  "data": "",
  "message": "string"
}
```

### 9. 菜单

#### 1. 添加菜单

* 接口名: /menu
* 请求类型: POST
* 功能说明:

    | 参数类型      | 字段名    |  说明  |  备注  |
    | :--------:  | :--------:   | :-------: | :-------: |
    | int      | menu_pid      |  父节点id    |   如果没有则为0，默认为0    |
    | String      | menu_name      |   菜单名称    |   无    |
    | String      | menu_description     |   图片所属相册   |   无    |

* 响应示例:

```json
{
  "code": 0,
  "data": "string",
  "message": "string"
}
```

#### 2. 获取所有菜单(博客前台显示)

> 在网页上先显示所有父节点菜单

* 接口名: /menu
* 请求类型: GET
* 功能说明:

    | 参数类型      | 字段名    |  说明  |  备注  |
    | :--------:  | :--------:   | :-------: | :-------: |

* 响应示例:

```json
{
  "code": 0,
  "data": [
    {
      "menuId": 1,
      "menuPid": 0,
      "menuName": "string",
      "menuDescription": "string",
      "childMenu": [
        {
          "menuId": 4,
          "menuPid": 1,
          "menuName": "string",
          "menuDescription": "string"
        },
        {
          "menuId": 5,
          "menuPid": 1,
          "menuName": "string",
          "menuDescription": "string"
        }
      ]
    },{
      "menuId": 2,
      "menuPid": 0,
      "menuName": "string",
      "menuDescription": "string",
      "childMenu": [
        {
          "menuId": 3,
          "menuPid": 2,
          "menuName": "string",
          "menuDescription": "string"
        },
        {
          "menuId": 6,
          "menuPid": 2,
          "menuName": "string",
          "menuDescription": "string"
        }
      ]
    }
  ],
  "message": "string"
}
```

#### 3. 删除指定菜单

> 管理员删除父节点菜单时需要先将子节点菜单都删除

* 接口名: /menu/{menu_id}
* 请求类型: DELETE
* 功能说明:

    | 参数类型      | 字段名    |  说明  |  备注  |
    | :--------:  | :--------:   | :-------: | :-------: |

* 响应示例:

```json
{
  "code": 0,
  "data": "string",
  "message": "string"
}
```

#### 4. 修改指定菜单

* 接口名: /menu/{menu_id}
* 请求类型: PUT
* 功能说明:

    | 参数类型      | 字段名    |  说明  |  备注  |
    | :--------:  | :--------:   | :-------: | :-------: |
    | String      | menuPid      |  菜单父节点    |   无    |
    | String      | menuName      |   菜单名称    |   无    |
    | String      | menuDescription     |   菜单描述   |   无    |

* 响应示例:

```json
{
  "code": 0,
  "data": "",
  "message": "string"
}
```

#### 5. 获取所有一级菜单

* 接口名: /parent_menu
* 请求类型: GET
* 功能说明:

    | 参数类型      | 字段名    |  说明  |  备注  |
    | :--------:  | :--------:   | :-------: | :-------: |

* 响应示例:

```json
{
  "code": 0,
  "data": [
    {
      "menuId": 1,
      "menuPid": 0,
      "menuName": "string",
      "menuDescription": "string",
    },{
      "menuId": 2,
      "menuPid": 0,
      "menuName": "string",
      "menuDescription": "string",
    }
  ],
  "message": "string"
}
```

### 10. 博客

#### 1. 发布博客

* 接口名: /blog
* 请求类型: POST
* 功能说明:

    | 参数类型      | 字段名    |  说明  |  备注  |
    | :--------:  | :--------:   | :-------: | :-------: |
    | int      | blogCreateTime      |  博客创建时间    |   首次发布    |
    | String      | blogTitle     |   博客标题   |   无    |
    | String      | blogSummary     |   博客摘要(默认博客内容前100字)   |   无    |
    | String      | blogContent     |   博客内容   |   html格式    |
    | int      | blogCategoryId     |   博客分类   |   无    |
    | list      | blog_tags     |   博客标签列表   |   无    |

* 响应示例:

```json
{
  "code": 0,
  "data": "string",
  "message": "string"
}
```

#### 2. 获取所有博客(分页获取),首页默认第一页(包含推荐)

* 接口名: /blog/{page_index}
* 请求类型: GET
* 功能说明:

    | 参数类型      | 字段名    |  说明  |  备注  |
    | :--------:  | :--------:   | :-------: | :-------: |

* 响应示例:

```json
{
  "code": 0,
  "data": {
    "list": [
      {
        "blog_id": 1,
        "blogCreateTime": 1545676878,
        "blogUpdateTime": 1545676878,
        "blogTitle": "string",
        "blogSummary": "string",
        "blogViews": 99,   // 文章访问量
        "blogReply": 99,   // 文章评论数
        "blogTags": [
          {
            "tagName": "string",  // 文章标签名
            "tagColor": "string",  // 文章标签颜色
          },
          {
            "tagName": "string",  // 文章标签名
            "tagColor": "string",  // 文章标签颜色
          }
        ],
        "blogRecommend": true,
      },{
        "blog_id": 2,
        "blogCreateTime": 1545676878,
        "blogUpdateTime": 1545676878,
        "blogTitle": "string",
        "blogSummary": "string",
        "blogViews": 99,
        "blogReply": 99,
        "blogTags": [
          {
            "tagName": "string",  // 文章标签名
            "tagColor": "string",  // 文章标签颜色
          },
          {
            "tagName": "string",  // 文章标签名
            "tagColor": "string",  // 文章标签颜色
          }
        ],
        "blogRecommend": true,
      }
    ],
    "pageCount": 2,   // 一共多少页
    "pageIndex": 1,   // 当前第几页
    "pageSize": 2,    // 每页的item数量 默认10
  },
  "message": "string"
}
```

#### 3. 获取指定分类下的博客(分页获取)

* 接口名: /album/{category_id}/{page_index}
* 请求类型: GET
* 功能说明:

    | 参数类型      | 字段名    |  说明  |  备注  |
    | :--------:  | :--------:   | :-------: | :-------: |

* 响应示例:

```json
{
  "code": 0,
  "data": {
    "list": [
      {
        "blog_id": 1,
        "blogCreateTime": 1545676878,
        "blogUpdateTime": 1545676878,
        "blogTitle": "string",
        "blogSummary": "string",
        "blogViews": 99,   // 文章访问量
        "blogReply": 99,   // 文章评论数
        "blogRecommend": true,
      },{
        "blog_id": 2,
        "blogCreateTime": 1545676878,
        "blogUpdateTime": 1545676878,
        "blogTitle": "string",
        "blogSummary": "string",
        "blogViews": 99,
        "blogReply": 99,
        "blogRecommend": true,
      }
    ],
    "pageCount": 2,   // 一共多少页
    "pageIndex": 1,   // 当前第几页
    "pageSize": 2,    // 每页的item数量 默认10
  },
  "message": "string"
}
```

#### 4. 删除指定博客(软删除)

* 接口名: /blog/{blog_id}
* 请求类型: DELETE
* 功能说明:

    | 参数类型      | 字段名    |  说明  |  备注  |
    | :--------:  | :--------:   | :-------: | :-------: |

* 响应示例:

```json
{
  "code": 0,
  "data": "string",
  "message": "string"
}
```

#### 5. 修改指定博客

* 接口名: /blog/{blog_id}
* 请求类型: PUT
* 功能说明:

    | 参数类型      | 字段名    |  说明  |  备注  |
    | :--------:  | :--------:   | :-------: | :-------: |
    | int      | blogUpdateTime      |  博客修改时间    |   修改    |
    | String      | blogTitle     |   博客标题   |   无    |
    | String      | blogSummary     |   博客摘要(默认博客内容前100字)   |   无    |
    | String      | blogContent     |   博客内容   |   html格式    |
    | int      | blogCategoryId     |   博客分类   |   无    |
    | list      | blogTags     |   博客标签列表   |   无    |

* 响应示例:

```json
{
  "code": 0,
  "data": "",
  "message": "string"
}
```

#### 6. 获取指定内容

* 接口名: /blogContent/{blog_id}
* 请求类型: GET
* 功能说明:

    | 参数类型      | 字段名    |  说明  |  备注  |
    | :--------:  | :--------:   | :-------: | :-------: |

* 响应示例:

```json
{
  "code": 0,
  "data": {
    "blogContent": "文章内容",
    "blogViews": 2,  // 文章浏览量
    "blogReply": 2,  // 文章评论数量
  },
  "message": "string"
}
```

### 11. 博客评论

#### 1. 给指定文章添加评论

* 接口名: /blog_comment/{blog_id}
* 请求类型: POST
* 功能说明:

    | 参数类型      | 字段名    |  说明  |  备注  |
    | :--------:  | :--------:   | :-------: | :-------: |
    | String      | blogCommentUsername      |  评论用户    |   无    |
    | String      | blogParentId      |   评论的父评论 默认为0    |   无    |
    | int      | blogCommentDate     |   评论时间    |   无    |
    | String      | blogCommentContent     |   评论内容    |   无    |

* 响应示例:

```json
{
  "code": 0,
  "data": "string",
  "message": "string"
}
```

#### 2. 获取所有评论列表(分页)

* 接口名: /blog_comment
* 请求类型: GET
* 功能说明:

    | 参数类型      | 字段名    |  说明  |  备注  |
    | :--------:  | :--------:   | :-------: | :-------: |

* 响应示例:

```json
{
  "code": 0,
  "data": {
    "list": [
      {
        "blogCommentUsername": "用户名",
        "blogCommentParentId": "string",
        "blogCommentBlogId": "string",
        "blogCommentDate": "string",
        "blogCommentContent": "string",
      },{
        "blogCommentUsername": "用户名",
        "blogCommentParentId": "string",
        "blogCommentBlogId": "string",
        "blogCommentDate": "string",
        "blogCommentContent": "string",
      }
    ],
    "pageCount": 2,   // 一共多少页
    "pageIndex": 1,   // 当前第几页
    "pageSize": 2,    // 每页的item数量 默认10
  },
  "message": "string"
}
```

#### 3. 删除指定评论

* 接口名: /blog_comment/{blog_comment_id}
* 请求类型: DELETE
* 功能说明:

    | 参数类型      | 字段名    |  说明  |  备注  |
    | :--------:  | :--------:   | :-------: | :-------: |

* 响应示例:

```json
{
  "code": 0,
  "data": "string",
  "message": "string"
}
```

### 12. 标签(博客)

#### 1. 添加标签

* 接口名: /tag
* 请求类型: POST
* 功能说明:

    | 参数类型      | 字段名    |  说明  |  备注  |
    | :--------:  | :--------:   | :-------: | :-------: |
    | String      | tagName      |  标签名称    |   无    |
    | String      | tagAlias      |   标签别名    |   无    |
    | String      | tagColor     |   标签颜色    |   无    |
    | String      | tagDescription     |   标签描述    |   无    |

* 响应示例:

```json
{
  "code": 0,
  "data": "string",
  "message": "string"
}
```

#### 2. 获取所有标签

* 接口名: /tag
* 请求类型: GET
* 功能说明:

    | 参数类型      | 字段名    |  说明  |  备注  |
    | :--------:  | :--------:   | :-------: | :-------: |

* 响应示例:

```json
{
  "code": 0,
  "data": [
    {
      "tagId": 1,
      "tagName": "string",
      "tagAlias": "string",
      "tagColor": "string",
      "tagDescription": "string",
    },{
      "tagId": 2,
      "tagName": "string",
      "tagAlias": "string",
      "tagColor": "string",
      "tagDescription": "string",
    }
  ],
  "message": "string"
}
```

#### 3. 删除指定标签

* 接口名: /tag/{tag_id}
* 请求类型: DELETE
* 功能说明:

    | 参数类型      | 字段名    |  说明  |  备注  |
    | :--------:  | :--------:   | :-------: | :-------: |

* 响应示例:

```json
{
  "code": 0,
  "data": "string",
  "message": "string"
}
```

#### 4. 修改指定标签

* 接口名: /tag/{tag_id}
* 请求类型: PUT
* 功能说明:

    | 参数类型      | 字段名    |  说明  |  备注  |
    | :--------:  | :--------:   | :-------: | :-------: |
    | String      | tagName      |  标签名称    |   无    |
    | String      | tagAlias      |   标签别名    |   无    |
    | String      | tagColor     |   标签颜色    |   无    |
    | String      | tagDescription     |   标签描述    |   无    |

* 响应示例:

```json
{
  "code": 0,
  "data": "",
  "message": "string"
}
```
