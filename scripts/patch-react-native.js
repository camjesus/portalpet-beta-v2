const fs = require('fs');
const path = require('path');

const filePath = path.join(
  __dirname,
  '../node_modules/react-native/ReactCommon/react/renderer/core/graphicsConversions.h'
);

try {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace std::format with folly::sformat
  const oldCode = 'return std::format("{}%", dimension.value);';
  const newCode = 'return folly::to<std::string>(dimension.value) + "%";';

  if (content.includes(oldCode)) {
    content = content.replace(oldCode, newCode);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('✅ Successfully patched React Native graphicsConversions.h');
  } else if (content.includes(newCode)) {
    console.log('✅ React Native graphicsConversions.h already patched');
  } else {
    console.log('⚠️  Could not find the code to patch in graphicsConversions.h');
  }
} catch (error) {
  console.error('❌ Error patching React Native:', error.message);
  process.exit(1);
}
