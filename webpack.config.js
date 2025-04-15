const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",  // نقطة البداية
  mode: process.env.NODE_ENV === "production" ? "production" : "development", // تعيين الوضع بناءً على البيئة
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",   // دعم ECMAScript الحديث
              "@babel/preset-react"  // دعم React
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",  // إدارة الصور والملفات الأخرى
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]  // لتفسير .js و .jsx تلقائيًا
  },
  output: {
    path: path.resolve(__dirname, "build"),  // تحديد مسار الإخراج
    filename: "bundle.js",  // تحديد اسم الملف الناتج
    publicPath: "/"  // تحديد المسار العام
  },
  devServer: {
    port: 3000,  // تشغيل السيرفر على المنفذ 3000
    historyApiFallback: true  // السماح بالتنقل عبر روابط الـ React Router
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"  // استخدام قالب HTML
    })
  ],
  optimization: {
    minimize: process.env.NODE_ENV === "production",  // تقليل حجم الملفات في بيئة الإنتاج
  }
};
