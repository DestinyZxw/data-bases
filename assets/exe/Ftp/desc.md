# FileZilla Server 安装和部署说明文档

## 一、服务端配置

### 1. 下载和安装FileZilla Server

1. 访问[FileZilla官网](https://filezilla-project.org/)。
2. 下载适用于Windows的FileZilla Server。
3. 运行安装程序并按照向导完成安装。

### 2. 启动和配置FileZilla Server

1. 启动FileZilla Server Interface。
2. 输入服务器地址`127.0.0.1`和端口`14147`，点击“连接”。
3. 设置管理员密码并保存。

### 3. 创建组、用户和共享文件夹

#### 创建组

1. 打开FileZilla Server Interface。
2. 在左侧菜单中选择“Groups”。
3. 点击“Add”按钮，输入组名并点击“OK”。
4. 在“Shared folders”选项卡中，点击“Add”按钮，选择要共享的文件夹。
5. 设置共享文件夹的权限（读、写、删除等）。
6. 在“Users”选项卡中，添加用户到该组。

#### 创建用户

1. 打开FileZilla Server Interface。
2. 在左侧菜单中选择“Users”。
3. 点击“Add”按钮，输入用户名并点击“OK”。
4. 在“General”选项卡中设置用户密码。
5. 在“Shared folders”选项卡中，点击“Add”按钮，选择要共享的文件夹。
6. 设置共享文件夹的权限（读、写、删除等）。
7. 在“Group membership”选项卡中，将用户添加到相应的组。

#### 共享文件夹设置

1. 打开FileZilla Server Interface。
2. 选择“Users”或“Groups”，然后选择具体的用户或组。
3. 在“Shared folders”选项卡中，点击“Add”按钮，选择要共享的文件夹。
4. 设置共享文件夹的权限（读、写、删除等）。

### 4. 配置被动模式端口范围

1. 打开FileZilla Server Interface。
2. 选择“编辑”菜单，然后选择“设置”。
3. 在左侧菜单中，选择“被动模式设置”。
4. 选择“使用以下被动模式端口范围”，并设置端口范围（例如 `50000-51000`）。
5. 在“外部服务器IP地址”中，选择“获取外部IP地址”或手动输入外部IP地址。
6. 点击“确定”保存设置。

### 5. 了解FTP服务器端口的区别

- **控制连接端口（21）**：用于传输FTP命令和响应。客户端通过端口21与服务器建立连接。
- **被动模式端口范围（例如50000-51000）**：用于传输文件数据。在被动模式下，服务器会在这些端口范围内打开端口，并告知客户端通过这些端口进行数据传输。
- **管理接口端口（14147）**：用于FileZilla Server的管理工具连接和配置管理。

## 二、防火墙配置

### 1. 配置Windows防火墙

#### 允许控制连接端口21

1. 打开“控制面板”，选择“系统和安全”。
2. 点击“Windows Defender防火墙”，然后选择“高级设置”。
3. 在左侧菜单中，选择“入站规则”。
4. 点击“新建规则”。
5. 选择“端口”，然后点击“下一步”。
6. 选择“TCP”，并在“特定本地端口”中输入“21”，然后点击“下一步”。
7. 选择“允许连接”，然后点击“下一步”。
8. 根据需要选择应用规则的网络类型，然后点击“下一步”。
9. 给规则命名（例如“FTP端口21”），然后点击“完成”。

#### 允许被动模式端口范围

1. 在左侧菜单中，选择“入站规则”。
2. 点击“新建规则”。
3. 选择“端口”，然后点击“下一步”。
4. 选择“TCP”，并在“特定本地端口”中输入被动模式端口范围（例如“50000-51000”），然后点击“下一步”。
5. 选择“允许连接”，然后点击“下一步”。
6. 根据需要选择应用规则的网络类型，然后点击“下一步”。
7. 给规则命名（例如“FTP被动端口范围”），然后点击“完成”。

## 三、客户端配置

### 1. 下载和安装FileZilla客户端

1. 访问[FileZilla官网](https://filezilla-project.org/download.php?type=client)。
2. 下载适用于你的操作系统的FileZilla客户端。
3. 按照安装向导完成安装。

### 2. 配置FileZilla客户端连接

1. 启动FileZilla客户端。
2. 打开“站点管理器”（文件 > 站点管理器）。
3. 点击“新站点”按钮，输入站点名称。
4. 在“常规”选项卡中，输入以下信息：
   - 主机：服务器的IP地址（例如 `192.168.1.100`）
   - 端口：`21`
   - 协议：FTP - 文件传输协议
   - 加密：要求使用显式FTP over TLS（推荐）
   - 登录类型：正常
   - 用户：FTP用户名
   - 密码：FTP密码
5. 在“传输设置”选项卡中，选择“被动模式”。
6. 点击“连接”按钮连接到FTP服务器。

### 主动模式与被动模式的区别

- **主动模式（Active Mode）**：
  - 客户端向服务器的端口21发送连接请求，并指定一个用于接收数据的端口。
  - 服务器从自己的端口20向客户端指定的端口发送数据。
  - **缺点**：客户端防火墙可能会阻止服务器的连接请求，导致传输失败。

- **被动模式（Passive Mode）**：
  - 客户端向服务器的端口21发送连接请求，服务器返回一个用于数据传输的端口。
  - 客户端向服务器指定的端口发送连接请求并进行数据传输。
  - **优点**：客户端主动连接服务器指定的端口，通常能绕过客户端防火墙限制。

### 3. 访问FTP服务器的不同方式

#### 通过浏览器访问

- **已不再推荐使用，浏览器基本不再支持**

#### 通过Windows资源管理器访问

- **使用方法**：在地址栏中输入 `ftp://<服务器IP地址>`（例如 `ftp://192.168.1.100`），按回车，输入用户名和密码。
- **优点**：可以像访问本地文件夹一样浏览FTP服务器上的文件，支持基本文件操作。
- **缺点**：功能有限，不支持高级FTP操作，不支持FTPS加密连接。

#### 通过FileZilla客户端访问

- **使用方法**：在站点管理器中配置连接信息，确保使用显式FTP over TLS进行加密连接，选择“被动模式”。
- **优点**：支持完整的FTP/FTPS功能，包括文件上传、下载和目录管理，提供详细连接日志，支持FTPS加密连接。
- **缺点**：需要下载和安装客户端软件，对于初学者可能需要一些配置和学习。

## 四、常见问题及解决方案

### 问题1：两台笔记本电脑之间无法ping通

**解决方法**：
1. 确保两台电脑在同一局域网内。
2. Windows网络位置设置为“公用网络”可能会阻止ping请求。
3. 检查并关闭防火墙对ICMP（Ping）请求的阻止。
   - 打开“控制面板”，选择“系统和安全”。
   - 点击“Windows Defender防火墙”，然后选择“高级设置”。
   - 在左侧菜单中，选择“入站规则”。
   - 找到并启用“文件和打印机共享（回显请求 - ICMPv4-In）”和“文件和打印机共享（回显请求 - ICMPv6-In）”。

### 问题2：FTP客户端登录成功但读取目录失败

**解决方法**：
1. 确保服务器和客户端都配置了被动模式端口范围。
2. 检查防火墙设置，确保被动模式端口范围已被允许。
3. 在FTP客户端中切换传输模式（被动模式或主动模式）。

### 问题3：GnuTLS error -110 in gnutls_record_recv: The TLS connection was non-properly terminated

**解决方法**：
1. 检查TLS/SSL配置是否正确。
2. 确保FTP客户端和服务器的时间

### 问题3： windows的IIS中其实包含了FTP Server
以后再说吧

## 参考
[FTP部署说明](https://blog.csdn.net/weixin_44300750/article/details/85322674)

[FreeFileSync+FTP进行数据备份-待实现](https://blog.csdn.net/qq_41221596/article/details/134960435)